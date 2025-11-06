import datetime
import os
import random

import requests

APP_NAME = "AutoTrend Vault"
APP_URL = "https://yourdomain.com"  # Replace with your actual domain
GIST_TOKEN = os.getenv("GIST_TOKEN")
HEADERS = {"Authorization": f"token {GIST_TOKEN}"}

MESSAGES = [
    f"{APP_NAME} drops daily GPT-4o guides from Google Trends. $5/month. Stay ahead 👉 {APP_URL}",
    f"Auto-ingested trends. Actionable guides. Zero effort. Try {APP_NAME} now 👉 {APP_URL}",
    f"Why chase trends manually? Let {APP_NAME} do it for you. Daily guides, $5/month 👉 {APP_URL}",
    f"Built with Flask + Stripe. AutoTrend Vault = daily GPT-4o hustle plans 👉 {APP_URL}",
]


def post_gist():
    msg = random.choice(MESSAGES)
    timestamp = datetime.datetime.utcnow().isoformat()
    payload = {
        "description": f"AutoTrend Vault Ad — {timestamp}",
        "public": True,
        "files": {"autotrend_ad.txt": {"content": msg}},
    }
    r = requests.post("https://api.github.com/gists", json=payload, headers=HEADERS)
    print("Posted:", r.status_code, r.json().get("html_url"))


if __name__ == "__main__":
    post_gist()
