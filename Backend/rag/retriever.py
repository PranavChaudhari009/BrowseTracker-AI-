from rag.vector_store import get_vector_store

def get_retriever(k:int=2):

    vector_store = get_vector_store()

    return vector_store.as_retriever(
        search_kwargs={"k":k},
        search_type = "similarity"
    )

#retriever.py