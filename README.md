# 🚀 AI Browser Tracker & Analytics Dashboard

An intelligent browser history tracker and AI assistant built with **FastAPI**, **PostgreSQL**, **ChromaDB (RAG)**, **Google Gemini AI**, and **React + TailwindCSS + Recharts**.

It automatically indexes your browser history, routes user queries intelligently between SQL and Vector RAG search, and presents real-time browsing analytics on a modern, dark/light mode dashboard.

---

## 📸 Screenshots & Demo

<div align="center">
  <h3>📊 Analytics Dashboard</h3>
  <img width="1917" height="806" alt="Screenshot 2026-07-26 105848 - Copy" src="https://github.com/user-attachments/assets/cff1daa2-e2e5-4580-92d5-5f24ebe59814" />

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
