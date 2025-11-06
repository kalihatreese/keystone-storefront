from flask import Flask, request

app = Flask(__name__)


@app.route("/vault")
def vault():
    with open("vault_blurbs.txt") as f:
        items = [line.strip() for line in f if line.strip()]
    html = "<h2>🔥 Trending Products</h2>"
    for item in items:
        html += f"<p>{item}<br><a href='/checkout?item={item}'>Buy Now</a></p><hr>"
    return html


@app.route("/checkout")
def checkout():
    item = request.args.get("item", "AutoTrend Product")
    html = f"""
    <h2>🛒 Checkout: {item}</h2>
    <form action='https://buy.stripe.com/test_4gwcN9g5N0gBf2EaEE' method='POST'>
        <input type='hidden' name='item' value='{item}'>
        <button type='submit'>Pay with Stripe</button>
    </form>
    """
    return html
