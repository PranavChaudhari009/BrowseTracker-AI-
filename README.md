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
  <img width="1908" height="1032" alt="Screenshot 2026-07-26 220750" src="https://github.com/user-attachments/assets/64d95a70-2478-49d8-b187-e2fc4bc76a84" />


  <p><i>Natural language query router searching your browser history using PostgreSQL SQL & ChromaDB Vector RAG.</i></p>
</div>



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



### 🔄 Flow Breakdown

1. **User asks a natural language question**
   - Example:
     - *"Summarise the searches I made on 14 July."*
     - *"What AI topics have I been learning recently?"*

2. **Gemini Query Router analyzes the query**
   - Routes the request based on user intent.

3. **📊 Exact Search (PostgreSQL)**
   Used for:
   - Specific dates
   - Exact URLs
   - Counts
   - Time-based filtering
   - Precise browsing history

4. **🧠 Semantic Search (ChromaDB + RAG)**
   Used for:
   - Topic summaries
   - Learning patterns
   - User intent
   - Related concepts
   - Natural language exploration

5. **✨ Gemini synthesizes the retrieved context**
   - Produces a concise, structured, and human-friendly response.

---

# ✨ Features

### 💬 AI Chat
- Conversational browser history search
- Persistent chat context
- "Search the way you like" experience
- Automatic SQL/RAG routing

### 📊 Analytics Dashboard
- Total Visits
- Unique Domains
- Total Searches
- Active Browsing Days

### 📈 Top Websites
- Interactive horizontal bar chart
- Displays the most frequently visited domains

### 🥧 Category Analysis
- Pie chart showing browsing categories
- Examples:
  - AI
  - Education
  - Streaming
  - Shopping
  - Social Media
  - Others

### 🕒 Hourly Activity Heatmap
- 24-hour activity visualization
- Quickly identify peak browsing hours

### 🔥 Search Streaks
- Current browsing streak
- Longest browsing streak
- Consecutive active-day calculation

### 💡 AI Insights
Automatically detects patterns such as:
- Most visited websites
- Preferred browsing hours
- Frequently searched topics
- Overall browsing behavior

### 🌓 Modern UI
- Dark & Light themes
- ChatGPT-inspired interface
- Responsive dashboard
- Smooth loading animations

---

# 🛠 Tech Stack

## Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API Framework |
| PostgreSQL | Browser history storage |
| SQLAlchemy | ORM |
| ChromaDB | Vector Database |
| Google Gemini API | LLM & Embeddings |
| Pydantic | Schema Validation |

---

## Frontend

| Technology | Purpose |
|------------|---------|
| React (Vite) | Frontend Framework |
| Tailwind CSS v4 | Styling |
| Recharts | Analytics Charts |
| Axios | API Client |
| Lucide React | Icons |

---

# 📂 Project Structure

```text
browser-tracker-AI/
│
├── assets/
│   ├── analytics-dashboard.png
│   └── ai-chatbot.png
│
├── Backend/
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirement.txt
│   │
│   ├── router/
│   │   └── analytics.py
│   │
│   ├── services/
│   │   ├── analytics_service.py
│   │   ├── sql_service.py
│   │   └── category_service.py
│   │
│   └── rag/
│       └── rag_services.py
│
└── Frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    │
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        │
        ├── components/
        │   ├── AnalyticsPage.jsx
        │   ├── ChatBox.jsx
        │   ├── StatCard.jsx
        │   ├── TopWebsitesChart.jsx
        │   ├── CategoriesChart.jsx
        │   ├── HourlyHeatmap.jsx
        │   ├── StreakCard.jsx
        │   ├── AiInsightsCard.jsx
        │   └── SkeletonLoader.jsx
        │
        └── services/
            ├── api.js
            └── analyticsApi.js
```

---

# 📡 API Endpoints

## 💬 AI Chat

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/chat` | Natural language browser history search using automatic SQL/RAG routing |

---

## 📊 Analytics

Base Route:

```text
/analytics
```

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/overview` | Returns total visits, unique domains, searches, and active days |
| GET | `/top-websites` | Returns the top 10 visited websites |
| GET | `/categories` | Returns browsing category distribution |
| GET | `/hourly-activity` | Returns activity count for each hour (0–23) |
| GET | `/streak` | Returns current and longest browsing streak |
| GET | `/insights` | Returns AI-generated browsing insights |

---

# 🎯 Highlights

- 🤖 AI-powered conversational browser history search
- 📊 Beautiful analytics dashboard
- 🧠 Automatic SQL vs Vector Search routing
- ⚡ FastAPI backend
- 🗄 PostgreSQL for structured search
- 🔎 ChromaDB for semantic retrieval
- ✨ Google Gemini for intelligent response synthesis
- 🌙 Modern dark/light responsive interface
- 📈 Interactive charts and visual insights


                
