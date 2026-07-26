from langchain_huggingface import HuggingFaceEmbeddings

from dotenv import load_dotenv

import os

api_key = os.getenv("GOOGLE_API_KEY")

def get_document_embedding():
    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )



#embedding.py