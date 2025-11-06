import datetime

import praw


def post_to_reddit(content):
    reddit = praw.Reddit(
        client_id="YOUR_CLIENT_ID",
        client_secret="YOUR_CLIENT_SECRET",
        user_agent="AutoTrendBot",
        username="YOUR_USERNAME",
        password="YOUR_PASSWORD",
    )
    subreddit = reddit.subreddit("YOUR_SUBREDDIT")
    title = f"AutoTrend Ad - {datetime.datetime.now().strftime('%H:%M')}"
    post = subreddit.submit(title, selftext=content)
    return post.url


if __name__ == "__main__":
    with open("vault_ingest.txt") as f:
        content = f.read()
    url = post_to_reddit(content)
    with open("adbot_log.txt", "a") as f:
        f.write(f"[Reddit] {url}\n")
