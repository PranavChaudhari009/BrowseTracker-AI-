
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from rag.retriever import get_retriever
from rag.prompt import get_prompt_template

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")


def format_docs(docs):
    """Helper function to combine retrieved document page contents into a single string."""
    return "\n\n".join(doc.page_content for doc in docs)


def get_rag_chain():
    retriever = get_retriever()
    prompt = get_prompt_template()


    llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.3,
)

    rag_chain = (
        {
            "context" : retriever | format_docs,
            "question" : RunnablePassthrough()
        }
        |prompt 
        |llm
        |StrOutputParser()
        
    )

    return rag_chain





#chain.py