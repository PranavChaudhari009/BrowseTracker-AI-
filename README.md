# browser-tracker-AI


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
                    Gemini/OpenAI
                          │
                    Final Answer
