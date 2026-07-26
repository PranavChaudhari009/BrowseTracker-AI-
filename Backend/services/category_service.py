def get_category(domain: str):

    domain = domain.lower()

    categories = {

        # Entertainment
        "youtube": "Entertainment",
        "netflix": "Entertainment",
        "cineby": "Entertainment",
        "cinegram": "Entertainment",
        "bookmyshow": "Entertainment",
        "epicgames": "Gaming",

        # Development
        "github": "Development",
        "stackoverflow": "Development",
        "leetcode": "Development",
        "kaggle": "Development",
        "geeksforgeeks": "Development",
        "huggingface": "AI",

        # AI
        "openai": "AI",
        "chatgpt": "AI",
        "gemini": "AI",
        "claude": "AI",
        "grok": "AI",
        "aistudio": "AI",

        # Career
        "linkedin": "Career",
        "unstop": "Career",
        "naukri": "Career",

        # Shopping
        "amazon": "Shopping",
        "flipkart": "Shopping",
        "meesho": "Shopping",
        "blinkit": "Shopping",
        "bigbasket": "Shopping",

        # Education
        "paruluniversity": "Education",
        "elearning": "Education",
        "coursera": "Education",
        "udemy": "Education",

        # Productivity
        "notion": "Productivity",
        "docs.google": "Productivity",
        "drive.google": "Productivity",

        # Social
        "instagram": "Social",
        "facebook": "Social",
        "twitter": "Social",
        "x.com": "Social",
        "reddit": "Social",
        "telegram": "Social",

        # Search
        "google": "Search",
        "bing": "Search"
    }


    for key, category in categories.items():
        if key in domain:
            return category

    return "Other"