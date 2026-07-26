from datetime import datetime, timedelta
from urllib.parse import urlparse, parse_qs



def chrome_time_to_datetime(chrome_time: int):
    epoch_start = datetime(1601, 1, 1)
    return epoch_start + timedelta(microseconds=chrome_time)


def extract_search_query(title: str, url: str):
    parsed = urlparse(url)

    # Google Search
    if "google." in parsed.netloc:
        query = parse_qs(parsed.query).get("q")
        if query:
            return query[0]

    # Fallback
    return title




def extract_domain(url: str) -> str:
    if not url:
        return ""

    domain = urlparse(url).netloc.lower()

    if domain.startswith("www."):
        domain = domain[4:]

    return domain    