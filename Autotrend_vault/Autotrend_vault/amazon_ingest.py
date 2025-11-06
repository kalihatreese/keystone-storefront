import requests
from bs4 import BeautifulSoup


def fetch_amazon_best_sellers():
    url = "https://www.amazon.com/Best-Sellers/zgbs"
    headers = {"User-Agent": "Mozilla/5.0"}
    soup = BeautifulSoup(requests.get(url, headers=headers).text, "html.parser")
    items = soup.select(".p13n-sc-truncate")
    return [i.get_text(strip=True) for i in items[:10]]


if __name__ == "__main__":
    products = fetch_amazon_best_sellers()
    with open("vault_ingest.txt", "a") as f:
        for item in products:
            f.write(f"Amazon: {item}\n")
