from langchain_core.documents import Document
from models import BrowserHistory



def history_to_document(history:BrowserHistory):

    return Document(
        page_content=f"""

Title:{history.title}

Url:{history.url}

Search_Query:{history.search_query}

visited_at:{history.visited_at}



""",
    metadata={
        "id":history.id,
        "url":history.url,
        "visited_at": str(history.visited_at)

    }
    )
           
#document.py