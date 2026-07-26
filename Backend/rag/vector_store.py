from langchain_chroma import Chroma
from rag.embedding import get_document_embedding
from dotenv import load_dotenv


def get_vector_store():

    emdedding = get_document_embedding()
    return Chroma(
        collection_name = "Brower_history",
        embedding_function = emdedding,
        persist_directory=".chroma_db"
    )

#vetor_database.py    