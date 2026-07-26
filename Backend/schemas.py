from pydantic import BaseModel
from typing import Optional, Literal, List

class ChatRequest(BaseModel):
    message: str

class SearchFilters(BaseModel):
    search_type: Literal["exact", "semantic"]
    date: Optional[str]
    keyword: Optional[str]

# ---------------------------------------------------------
# Analytics Schemas
# ---------------------------------------------------------

class OverviewResponse(BaseModel):
    total_visits: int
    unique_domains: int
    total_searches: int
    active_days: int

class TopWebsiteItem(BaseModel):
    domain: str
    count: int

class CategoryItem(BaseModel):
    category: str
    count: int

class InsightsResponse(BaseModel):
    insights: List[str]

class StreakResponse(BaseModel):
    current_streak: int
    longest_streak: int

class HourlyActivityItem(BaseModel):
    hour: int
    count: int