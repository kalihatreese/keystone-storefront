import requests


def check_vault():
    try:
        res = requests.get("https://wiring-suspension-dat-cons.trycloudflare.com/vault")
        if res.status_code == 200:
            print("✅ Vault ingestion healthy")
        else:
            print("⚠️ Vault ingestion failed:", res.status_code)
    except Exception as e:
        print("❌ Vault unreachable:", str(e))


if __name__ == "__main__":
    check_vault()
