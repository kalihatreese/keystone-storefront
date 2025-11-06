import requests
import stripe
from flask import Flask, request

app = Flask(__name__)
stripe.api_key = "sk_test_your_secret_key_here"  # Replace with your real key


@app.route("/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")
    endpoint_secret = "whsec_your_webhook_secret_here"  # Replace with your real secret

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except Exception as e:
        return f"Webhook Error: {str(e)}", 400

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        product_id = session.get("client_reference_id", "unknown")
        requests.post(
            "https://autotrend-vault.trycloudflare.com/log",
            json={
                "event": "checkout_complete",
                "product": product_id,
                "email": session.get("customer_email", "unknown"),
            },
        )

    return "", 200


if __name__ == "__main__":
    app.run(port=4242)
