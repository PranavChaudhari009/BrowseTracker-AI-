# 🚀 AI Browser Tracker & Analytics Dashboard

An intelligent browser history tracker and AI assistant built with **FastAPI**, **PostgreSQL**, **ChromaDB (RAG)**, **Google Gemini AI**, and **React + TailwindCSS + Recharts**.

It automatically indexes your browser history, routes user queries intelligently between SQL and Vector RAG search, and presents real-time browsing analytics on a modern, dark/light mode dashboard.

---

## 📸 Screenshots & Demo

<div align="center">
  <h3>📊 Analytics Dashboard</h3>
  <img width="1917" height="1078" alt="Screenshot 2026-07-26 105857" src="https://github.com/user-attachments/assets/4ea33cbf-8391-4dcf-9f7b-2f627ddd4b68" />


  <p><i>Real-time metrics, Top Visited Websites bar chart, Search Categories pie chart, Hourly Heatmap, Streaks & AI Insights.</i></p>

  <br />

  <h3>💬 AI Chatbot Assistant ("SEARCH THE WAY YOU LIKE")</h3>
  <img width="1916" height="1078" alt="Screenshot 2026-07-26 111354" src="https://github.com/user-attachments/assets/100824a0-7687-43b6-8fae-f24a7586b5b1" />

  <p><i>Natural language query router searching your browser history using PostgreSQL SQL & ChromaDB Vector RAG.</i></p>
</div>

> 💡 **Note**: Save your updated screenshots in an `assets/` folder in the root directory named `analytics-dashboard.png` and `ai-chatbot.png`.

---

## 🏗️ Architecture & Query Routing

The backend uses a dual-engine architecture powered by **Google Gemini** as an intelligent query router:

```ascii
                User Question
                       │
                Query Router
                 /          \
                /            \
  Date/Count/Time?        Meaning?
         │                   │
         ▼                   ▼
  PostgreSQL             ChromaDB
         │                   │
  SQL Result          Top K Documents
         \                   /
          \                 /
           ▼               ▼
                Gemini AI
                      │
                Final Answer

Flow Breakdown:
User Question: User asks a natural language question about their history (e.g. "Summarise the search I did on 14 July").
Gemini Query Router: Analyzes intent and routes to either:
📊 Exact Search (PostgreSQL): Executed when questions mention specific dates, times, exact URLs, or counting logic.
🧠 Semantic Search (ChromaDB Vector RAG): Executed when questions ask about broad topics, intent, learning concepts, or semantic summaries.
Synthesis: Relevant context is passed back to Gemini to synthesize a concise, structured response.
✨ Features
📊 Overview Metrics: Total visits, unique domains, total searches, and active days.
📈 Top Visited Websites: Interactive horizontal bar chart displaying top domains.
🥧 Search Categories: Pie chart breaking down activity by topic (AI, Education, Streaming/Movies, Shopping, etc.).
🕒 Hourly Activity Heatmap: 24-hour visual block intensity map (0-23 hours).
🔥 Search Streaks: Calculates current & longest consecutive active browsing days.
💡 AI Insights: Automated pattern detection highlighting top browsing habits.
💬 RAG AI Chatbot: Conversational search over full history with persistent chat state & "SEARCH THE WAY YOU LIKE" query routing.
🌓 Dark / Light Mode: Modern UI design inspired by ChatGPT, Linear, and Vercel.
🛠️ Tech Stack
Backend
Framework: FastAPI (Python 3.10+)
Database: PostgreSQL (SQLAlchemy ORM)
Vector Database: ChromaDB
LLM & Embeddings: Google Gemini API (genai)
Schema Validation: Pydantic
Frontend
Framework: React (Vite)
Styling: Tailwind CSS v4
Charts: Recharts
Icons: Lucide React
HTTP Client: Axios

browser-tracker-AI/
├── assets/                      # Repository screenshots & media
│   ├── analytics-dashboard.png
│   └── ai-chatbot.png
│
├── Backend/
│   ├── database.py              # PostgreSQL database engine & session setup
│   ├── main.py                  # FastAPI main application & chat endpoint
│   ├── models.py                # SQLAlchemy BrowserHistory model
│   ├── schemas.py               # Pydantic request/response schemas
│   ├── requirement.txt          # Python backend dependencies
│   ├── router/
│   │   └── analytics.py         # /analytics API routes
│   ├── services/
│   │   ├── analytics_service.py # Database analytics queries & streak math
│   │   ├── sql_service.py       # SQL exact search service
│   │   └── category_service.py  # Domain category classification logic
│   └── rag/
│       └── rag_services.py      # ChromaDB RAG vector search service
│
└── Frontend/
    ├── index.html               # Web entry point
    ├── package.json             # Node dependencies & scripts
    ├── vite.config.js           # Vite build configuration
    └── src/
        ├── App.jsx              # Main tab router & dark theme manager
        ├── main.jsx             # React DOM root render
        ├── index.css            # Tailwind CSS v4 directives
        ├── components/
        │   ├── AnalyticsPage.jsx # Dashboard layout container
        │   ├── ChatBox.jsx       # RAG AI Chatbot component
        │   ├── StatCard.jsx      # Metric stat cards
        │   ├── TopWebsitesChart.jsx # Recharts horizontal bar chart
        │   ├── CategoriesChart.jsx  # Recharts pie chart
        │   ├── HourlyHeatmap.jsx    # 24-hour block heatmap grid
        │   ├── StreakCard.jsx       # Search streak indicator card
        │   ├── AiInsightsCard.jsx   # AI insights list card
        │   └── SkeletonLoader.jsx   # Shimmer loading state placeholders
        └── services/
            ├── api.js           # Chatbot API service
            └── analyticsApi.js  # Analytics API service

📡 API Endpoints
💬 Chat Router
POST /api/chat - Natural language query over history (SQL / RAG routed).
📊 Analytics Router (/analytics)
GET /analytics/overview - Returns total visits, unique domains, searches count, and active days.
GET /analytics/top-websites - Returns top 10 visited domains ordered by count.
GET /analytics/categories - Returns count distribution per browsing category.
GET /analytics/insights - Returns rule-based/AI generated insights.
GET /analytics/streak - Returns current and longest active day streaks.
GET /analytics/hourly-activity - Returns hourly visit count array (0 to 23 hours).
                


                
