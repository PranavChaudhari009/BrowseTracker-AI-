from database import SessionLocal
from models import BrowserHistory
from history_reader import copy_history, read_history
from utils import (
    chrome_time_to_datetime,
    extract_search_query,
    extract_domain,
)


def save_history():
    db = SessionLocal()

    try:
        copy_history()
        history = read_history()

        for title, url, last_visit_time in history:

            visited_at = chrome_time_to_datetime(last_visit_time)
            search_query = extract_search_query(title,url)
            domain = extract_domain(url)

            # Prevent duplicate entries
            existing = (
                db.query(BrowserHistory)
                .filter(BrowserHistory.url == url)
                .first()
            )

            if existing:
                continue

            history_record = BrowserHistory(
                title=title,
                url=url,
                domain=domain,
                search_query=search_query,
                category=None,
                visited_at=visited_at,
            )

            db.add(history_record)

        db.commit()
        print("History saved successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    save_history()