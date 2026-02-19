import re

import requests


def fetch_tiktok_trends():
    url = "https://www.tiktok.com/trending"
    headers = {"User-Agent": "Mozilla/5.0"}
    html = requests.get(url, headers=headers).text
    products = re.findall(r'"title":"(.*?)"', html)
    return list(set(products[:10]))


if __name__ == "__main__":
    trends = fetch_tiktok_trends()
    with open("vault_ingest.txt", "a") as f:
        for item in trends:
            f.write(f"TikTok: {item}\n")
