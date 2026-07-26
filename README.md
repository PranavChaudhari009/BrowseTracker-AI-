# 🚀 AI Browser Tracker & Analytics Dashboard

An intelligent browser history tracker and AI assistant built with **FastAPI**, **PostgreSQL**, **ChromaDB (RAG)**, **Google Gemini AI**, and **React + TailwindCSS + Recharts**.

It automatically indexes your browser history, routes user queries intelligently between SQL and Vector RAG search, and presents real-time browsing analytics on a modern, dark/light mode dashboard.

---

## 📸 Screenshots & Demo

<div align="center">
  <h3>📊 Analytics Dashboard</h3>
  <img src="./assets/analytics-dashboard.png" alt="Analytics Dashboard" width="100%" />
  <p><i>Real-time metrics, Top Websites bar chart, Search Categories pie chart, Hourly Heatmap, Streaks & AI Insights.</i></p>

  <br />

  <h3>💬 AI Chat Assistant (RAG Search)</h3>
  <img src="./assets/ai-chatbot.png" alt="AI Chatbot Assistant" width="100%" />
  <p><i>Natural language query router searching your browser history using PostgreSQL SQL & ChromaDB Vector RAG.</i></p>
</div>

> 💡 **Note**: Save your screenshots inside an `assets/` folder in the root directory named `analytics-dashboard.png` and `ai-chatbot.png`.

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
