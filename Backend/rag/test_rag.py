from rag.rag_services import ask_rag_service
import os


query = "What websites did I visit related to LangChain?"

response = ask_rag_service(query)

print("\nResponse:\n")

print(os.getenv("GOOGLE_API_KEY"))
print(response)