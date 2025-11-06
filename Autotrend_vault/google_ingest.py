from pytrends.request import TrendReq


def fetch_google_trends():
    pytrends = TrendReq()
    trending = pytrends.trending_searches(pn="united_states")
    return trending[0].tolist()[:10]


if __name__ == "__main__":
    trends = fetch_google_trends()
    with open("vault_ingest.txt", "a") as f:
        for item in trends:
            f.write(f"Google: {item}\n")
