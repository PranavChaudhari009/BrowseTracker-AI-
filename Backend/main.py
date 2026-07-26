# main.py

import os
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from tenacity import retry, stop_after_attempt, wait_exponential, RetryError
from router.analytics import router as analytics_router







from google import genai

# ---------------------------------------------------------
# Load Environment Variables
# ---------------------------------------------------------

load_dotenv(Path(__file__).resolve().parent / ".env")

# ---------------------------------------------------------
# Local imports
# ---------------------------------------------------------

from database import engine, get_db
import models
import schemas

from services.sql_service import query_history
from rag.rag_services import ask_rag_service

# ---------------------------------------------------------
# Database
# ---------------------------------------------------------

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Browser History AI")

app.include_router(analytics_router)

# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Gemini Client
# ---------------------------------------------------------

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise RuntimeError("GOOGLE_API_KEY not found in .env")

client = genai.Client(api_key=api_key)

# ---------------------------------------------------------
# Retry Functions
# ---------------------------------------------------------

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
)
def extract_filters_with_retry(prompt: str):
    return client.models.generate_content(
        model="models/gemini-3.5-flash-lite",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": schemas.SearchFilters,
        },
    )


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
)
def summarize_with_retry(prompt: str):
    return client.models.generate_content(
        model="models/gemini-3.5-flash-lite",
        contents=prompt,
    )

# ---------------------------------------------------------
# Chat Endpoint
# ---------------------------------------------------------

@app.post("/api/chat")
async def chat_with_history(
    request: schemas.ChatRequest,
    db: Session = Depends(get_db),
):

    user_message = request.message

    today = datetime.now().strftime("%Y-%m-%d")

    extraction_prompt = f"""

Today's date is {today}.

You are an AI router for a Browser History Assistant.

Analyze the user's question and return ONLY JSON matching the provided schema.

Instructions:

1. Decide whether the query should use:
   - "exact" search
   - "semantic" search

2. Extract:
   - date (if mentioned)
   - keyword (if present)

3. Write a concise summary of the user's request.
   - The summary must be written as one short paragraph.
   - Do NOT use bullet points.
   - Do NOT number items.
   - Do NOT include markdown.
   - Write it in natural English (1–3 sentences).

Routing Rules:

- search_type = "exact"
  if the question mentions a date, time, URL, website, specific keyword, or asks for an exact browser history lookup.

- search_type = "semantic"
  if the question asks about a topic, concept, category, intent, learning, or requires understanding across multiple browsing records.

User Question:
{user_message}
"""
    # ---------------------------------------------------------
    # Gemini Router
    # ---------------------------------------------------------

    try:
        extraction_response = extract_filters_with_retry(extraction_prompt)

    except RetryError as e:
        print(e.last_attempt.exception())

        raise HTTPException(
            status_code=500,
            detail=f"Gemini routing failed: {e.last_attempt.exception()}",
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini routing failed: {str(e)}",
        )

    filters = extraction_response.parsed

    search_type = filters.search_type
    extracted_date = filters.date
    extracted_keyword = filters.keyword

    print("Router:", search_type)
    print("Date:", extracted_date)
    print("Keyword:", extracted_keyword)

    # ---------------------------------------------------------
    # Semantic Search (RAG)
    # ---------------------------------------------------------

    if search_type == "semantic":

        try:

            answer = ask_rag_service(user_message)

            return {
                "response": answer,
                "router_decision": "semantic",
                "extracted_filters": {
                    "date": extracted_date,
                    "keyword": extracted_keyword,
                },
            }

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"RAG failed: {str(e)}",
            )

    # ---------------------------------------------------------
    # Exact Search (SQL)
    # ---------------------------------------------------------

    try:

        records = query_history(
            db=db,
            search_date=extracted_date,
            keyword=extracted_keyword,
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database query failed: {str(e)}",
        )

    if not records:

        return {
            "response": "I couldn't find any matching browser history.",
            "router_decision": "exact",
        }

    history_context = "\n".join(
        [
            f"[{r.visited_at}] "
            f"Title: {r.title} | "
            f"URL: {r.url} | "
            f"Search Query: {r.search_query or 'N/A'}"
            for r in records
        ]
    )

    summary_prompt = f"""
Answer ONLY using the browser history below.

User Question:
{user_message}

Browser History:
{history_context}
"""

    try:

        summary = summarize_with_retry(summary_prompt)

        answer = summary.text

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Gemini summarization failed: {str(e)}",
        )

    return {
        "response": answer,
        "router_decision": "exact",
        "extracted_filters": {
            "date": extracted_date,
            "keyword": extracted_keyword,
        },
    }