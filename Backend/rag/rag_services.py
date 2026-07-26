from rag.chain import get_rag_chain

def ask_rag_service(query: str) -> str:

    rag_chain = get_rag_chain()

    response = rag_chain.invoke(query)

    return response


#rag_services