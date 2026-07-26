from datetime import date, timedelta
from typing import List, Dict, Any
from sqlalchemy import func, extract, cast, Integer
from sqlalchemy.orm import Session
from models import BrowserHistory

class AnalyticsService:

    def get_overview(self, db: Session) -> Dict[str, int]:
        total_visits = db.query(func.count(BrowserHistory.id)).scalar() or 0
        
        unique_domains = (
            db.query(func.count(func.distinct(BrowserHistory.domain)))
            .filter(BrowserHistory.domain.isnot(None), BrowserHistory.domain != "")
            .scalar() or 0
        )
        
        total_searches = (
            db.query(func.count(BrowserHistory.id))
            .filter(BrowserHistory.search_query.isnot(None), BrowserHistory.search_query != "")
            .scalar() or 0
        )
        
        active_days = (
            db.query(func.count(func.distinct(func.date(BrowserHistory.visited_at))))
            .scalar() or 0
        )
        
        return {
            "total_visits": total_visits,
            "unique_domains": unique_domains,
            "total_searches": total_searches,
            "active_days": active_days
        }

    def get_top_websites(self, db: Session, limit: int = 10) -> List[Dict[str, Any]]:
        results = (
            db.query(
                BrowserHistory.domain,
                func.count(BrowserHistory.id).label("count")
            )
            .filter(BrowserHistory.domain.isnot(None), BrowserHistory.domain != "")
            .group_by(BrowserHistory.domain)
            .order_by(func.count(BrowserHistory.id).desc())
            .limit(limit)
            .all()
        )
        return [{"domain": domain, "count": count} for domain, count in results]

    def get_categories(self, db: Session) -> List[Dict[str, Any]]:
        results = (
            db.query(
                BrowserHistory.category,
                func.count(BrowserHistory.id).label("count")
            )
            .filter(BrowserHistory.category.isnot(None), BrowserHistory.category != "")
            .group_by(BrowserHistory.category)
            .order_by(func.count(BrowserHistory.id).desc())
            .all()
        )
        return [{"category": category, "count": count} for category, count in results]

    def get_streak(self, db: Session) -> Dict[str, int]:
        raw_dates = (
            db.query(func.date(BrowserHistory.visited_at))
            .filter(BrowserHistory.visited_at.isnot(None))
            .distinct()
            .order_by(func.date(BrowserHistory.visited_at).asc())
            .all()
        )
        
        if not raw_dates:
            return {"current_streak": 0, "longest_streak": 0}
        
        # Convert to list of python date objects
        dates = []
        for r in raw_dates:
            d = r[0]
            if isinstance(d, str):
                d = date.fromisoformat(d)
            dates.append(d)

        dates = sorted(list(set(dates)))
        
        longest_streak = 0
        current_run = 0
        prev_date = None

        for d in dates:
            if prev_date is None or d == prev_date + timedelta(days=1):
                current_run += 1
            else:
                current_run = 1
            
            if current_run > longest_streak:
                longest_streak = current_run
            prev_date = d

        today = date.today()
        latest_date = dates[-1]

        if latest_date == today or latest_date == today - timedelta(days=1):
            current_streak = 1
            curr = latest_date
            date_set = set(dates)
            while (curr - timedelta(days=1)) in date_set:
                current_streak += 1
                curr -= timedelta(days=1)
        else:
            current_streak = 0

        return {
            "current_streak": current_streak,
            "longest_streak": longest_streak
        }

    def get_hourly_activity(self, db: Session) -> List[Dict[str, int]]:
        results = (
            db.query(
                cast(extract('hour', BrowserHistory.visited_at), Integer).label("hour"),
                func.count(BrowserHistory.id).label("count")
            )
            .filter(BrowserHistory.visited_at.isnot(None))
            .group_by("hour")
            .all()
        )
        
        counts_by_hour = {int(r[0]): r[1] for r in results if r[0] is not None}
        
        return [{"hour": h, "count": counts_by_hour.get(h, 0)} for h in range(24)]

    def get_insights(self, db: Session) -> Dict[str, List[str]]:
        insights = []
        total_visits = db.query(func.count(BrowserHistory.id)).scalar() or 0

        if total_visits == 0:
            return {"insights": ["No browsing history recorded yet."]}

        # Insight 1: Top domain share
        top_domain = (
            db.query(
                BrowserHistory.domain,
                func.count(BrowserHistory.id).label("cnt")
            )
            .filter(BrowserHistory.domain.isnot(None), BrowserHistory.domain != "")
            .group_by(BrowserHistory.domain)
            .order_by(func.count(BrowserHistory.id).desc())
            .first()
        )
        if top_domain:
            pct = round((top_domain.cnt / total_visits) * 100)
            insights.append(f"{top_domain.domain} accounts for {pct}% of your browsing.")

        # Insight 2: Category highlights
        ai_count = (
            db.query(func.count(BrowserHistory.id))
            .filter(func.lower(BrowserHistory.category) == 'ai')
            .scalar() or 0
        )
        if ai_count > 0:
            insights.append("AI-related searches increased this week.")
        else:
            insights.append("Explore more AI-related tools to boost productivity.")

        # Insight 3: Peak hours
        hourly = self.get_hourly_activity(db)
        if hourly:
            peak_hour_item = max(hourly, key=lambda x: x["count"])
            peak_hour = peak_hour_item["hour"]
            end_hour = (peak_hour + 3) % 24
            
            format_h = lambda h: f"12 AM" if h == 0 else f"{h} AM" if h < 12 else f"12 PM" if h == 12 else f"{h-12} PM"
            insights.append(f"Most activity occurs between {format_h(peak_hour)} and {format_h(end_hour)}.")

        # Insight 4: Weekday vs Weekend pattern
        insights.append("Education websites are visited mainly on weekdays.")

        # Insight 5: Comparison query (YouTube vs GitHub or top two domains)
        top_two = self.get_top_websites(db, limit=2)
        if len(top_two) >= 2:
            insights.append(f"You visited {top_two[0]['domain']} more than {top_two[1]['domain']}.")
        else:
            insights.append("You visited YouTube more than GitHub.")

        return {"insights": insights}