from database import Base
from sqlalchemy import Integer,String,Column,DateTime


class BrowserHistory(Base):
    __tablename__ = "browser_history"
    
    id = Column(
        Integer,
        primary_key=True
    )


    title = Column(
        String
    )


    domain = Column(
        String,
        index=True,
        nullable=True
    )

    category = Column(String, nullable=True)


    url = Column(
        String
    )


    search_query = Column(
        String,
        nullable=True
    )


    visited_at = Column(
        DateTime
    )
