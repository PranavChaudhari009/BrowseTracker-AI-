from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from models import BrowserHistory


def query_history(
    db: Session,
    search_date: str = None,
    keyword: str = None,
    limit: int = 50,
):
    """
    Query browser history using exact filters.

    Args:
        db: SQLAlchemy database session
        search_date: Date in YYYY-MM-DD format
        keyword: Exact keyword/website/title search
        limit: Maximum number of records

    Returns:
        List[BrowserHistory]
    """

    query = db.query(BrowserHistory)

    # Filter by date
    if search_date:
        try:
            parsed_date = datetime.strptime(
                search_date,
                "%Y-%m-%d"
            ).date()

            query = query.filter(
                func.date(BrowserHistory.visited_at) == parsed_date
            )

        except ValueError:
            pass

    # Filter by keyword
    if keyword:
        query = query.filter(
            (BrowserHistory.title.ilike(f"%{keyword}%"))
            |
            (BrowserHistory.search_query.ilike(f"%{keyword}%"))
            |
            (BrowserHistory.url.ilike(f"%{keyword}%"))
        )

    return (
        query.order_by(BrowserHistory.visited_at.desc())
        .limit(limit)
        .all()
    )