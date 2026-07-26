from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.analytics_service import AnalyticsService
import schemas

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

service = AnalyticsService()

@router.get("/overview", response_model=schemas.OverviewResponse)
def get_overview(db: Session = Depends(get_db)):
    return service.get_overview(db)

@router.get("/top-websites", response_model=list[schemas.TopWebsiteItem])
def get_top_websites(db: Session = Depends(get_db)):
    return service.get_top_websites(db)

@router.get("/categories", response_model=list[schemas.CategoryItem])
def get_categories(db: Session = Depends(get_db)):
    return service.get_categories(db)

@router.get("/insights", response_model=schemas.InsightsResponse)
def get_insights(db: Session = Depends(get_db)):
    return service.get_insights(db)

@router.get("/streak", response_model=schemas.StreakResponse)
def get_streak(db: Session = Depends(get_db)):
    return service.get_streak(db)

@router.get("/hourly-activity", response_model=list[schemas.HourlyActivityItem])
def get_hourly_activity(db: Session = Depends(get_db)):
    return service.get_hourly_activity(db)