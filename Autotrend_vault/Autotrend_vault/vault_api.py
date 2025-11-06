import json

from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/vault", methods=["GET"])
def get_products():
    try:
        with open("vault_ingest.txt", "r") as f:
            lines = f.readlines()
            products = [json.loads(line.strip()) for line in lines if line.strip()]
            return jsonify(products)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/log", methods=["POST"])
def log_event():
    data = request.json
    with open("vault_log.txt", "a") as f:
        f.write(json.dumps(data) + "\n")
    return jsonify({"status": "logged"})


@app.route("/logs", methods=["GET"])
def get_logs():
    try:
        with open("vault_log.txt", "r") as f:
            lines = f.readlines()
            logs = [json.loads(line.strip()) for line in lines if line.strip()]
            return jsonify(logs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=3000)
