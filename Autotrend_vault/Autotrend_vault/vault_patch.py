# 🧬 Vault Route Mutation for Keystone AI Storefront

from flask import Flask

app = Flask(__name__)


@app.route("/vault")
def vault():
    with open("vault_blurbs.txt") as f:
        items = [line.strip() for line in f if line.strip()]
    html = "<h2>🔥 Trending Products</h2>"
    for item in items:
        html += f"<p>{item}<br><a href='/checkout?item={item}'>Buy Now</a></p><hr>"
    return html
