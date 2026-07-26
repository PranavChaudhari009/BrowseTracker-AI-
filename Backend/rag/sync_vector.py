import time

from database import SessionLocal
from models import BrowserHistory
from rag.document import history_to_document
from rag.vector_store import get_vector_store


BATCH_SIZE = 50
DELAY_SECONDS = 10


def sync_database_to_vectorstore():

    db = SessionLocal()
    vector_store = get_vector_store()

    try:
        total_records = db.query(BrowserHistory).count()
        print(f"Total records: {total_records}")

        if total_records == 0:
            print("No browser history found to sync.")
            return

        offset = 0

        while True:
            histories = (
                db.query(BrowserHistory)
                .offset(offset)
                .limit(BATCH_SIZE)
                .all()
            )

            if not histories:
                break

            documents = []
            ids = []

            for history in histories:
                documents.append(history_to_document(history))
                ids.append(str(history.id))

            vector_store.add_documents(
                documents=documents,
                ids=ids
            )

            offset += len(histories)

            print(f"Synced {offset}/{total_records} records")

            # Wait before sending the next batch
            time.sleep(DELAY_SECONDS)

        print("✅ All browser history synced successfully!")

    finally:
        db.close()


if __name__ == "__main__":
    sync_database_to_vectorstore()