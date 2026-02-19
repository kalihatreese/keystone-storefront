from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route("/vault", methods=["GET"])
def get_products():
    with open("vault_ingest.jsonl") as f:
        lines = f.readlines()
        products = [json.loads(line.strip()) for line in lines if line.strip()]
    return jsonify(products)

@app.route("/log", methods=["POST"])
def log_event():
    data = request.json
    with open("vault_log.txt", "a") as f:
        f.write(json.dumps(data) + "\n")
    return jsonify({"status": "logged"})

@app.route("/logs", methods=["GET"])
def get_logs():
    with open("vault_log.txt") as f:
        lines = f.readlines()
        logs = [json.loads(line.strip()) for line in lines if line.strip()]
    return jsonify(logs)

@app.route("/vault-html")
def vault_html():
    with open("vault_blurbs.txt") as f:
        items = [line.strip() for line in f if line.strip()]
    html = "<h2>🔥 Trending Products</h2>"
    for item in items:
        html += f"<p>{item}<br><a href='/checkout?item={item}'>Buy Now</a></p><hr>"
    return html

if __name__ == "__main__":
    app.run(port=3000)
