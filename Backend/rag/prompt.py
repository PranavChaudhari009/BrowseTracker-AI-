from langchain_core.prompts import ChatPromptTemplate


def get_prompt_template():

    template = """You are an AI assistant helping a user analyze and recall information from their browser history.
Use the following pieces of retrieved context to answer the user's question.
If you do not know the answer based on the context, state that clearly. Keep your answer concise and relevant.

Context:
{context}

Question:
{question}

Answer:
"""


    return ChatPromptTemplate.from_template(template)


#prompt.py