import datetime, os, requests, json
def get_products():
    try:
        with open("vault_ingest.txt") as f:
            return [ln.strip() for ln in f if ln.strip()]
    except:
        return ["Vault is empty"]

def post_to_gist(content):
    token = os.getenv("GH_TOKEN","").strip()
    url = "https://api.github.com/gists"
    payload = {"description":"AutoTrend Ad","public":True,"files":{"ad.txt":{"content":content}}}
    headers = {"Accept":"application/vnd.github+json"}
    if token: headers["Authorization"] = f"Bearer {token}"
    r = requests.post(url, headers=headers, json=payload, timeout=30)
    return (r.json().get("html_url") or f"Gist failed {r.status_code}")

def post_to_telegraph(content):
    # Telegraph API: createAccount -> createPage
    try:
        acc = requests.post("https://api.telegra.ph/createAccount",
                            data={"short_name":"autotrend","author_name":"AutoTrend"},
                            timeout=30).json()
        token = acc.get("result",{}).get("access_token","")
        page = requests.post("https://api.telegra.ph/createPage",
                             data={"access_token":token,"title":"AutoTrend Ad",
                                   "content":json.dumps([{"tag":"pre","children":[content]}]),
                                   "return_content":False},
                             timeout=30).json()
        return page.get("result",{}).get("url","Telegraph failed")
    except Exception as e:
        return f"Telegraph failed {e}"

def post_to_pasteee(content):
    token = os.getenv("PASTEEE_TOKEN","").strip()
    headers = {"X-Auth-Token": token} if token else {}
    r = requests.post("https://api.paste.ee/v1/pastes",
                      headers=headers,
                      json={"description":"AutoTrend Ad",
                            "sections":[{"name":"ad","syntax":"markdown","contents":content}]},
                      timeout=30)
    if r.ok:
        return r.json().get("link","Paste.ee ok no link")
    return f"Paste.ee failed {r.status_code}"

def fire_ad():
    products = get_products()
    ts = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%SZ")
    content = f"🧬 AutoTrend Ad ({ts})\n\n" + "\n".join(products)
    urls = [post_to_gist(content), post_to_telegraph(content), post_to_pasteee(content)]
    with open("adbot_log.txt","a") as f:
        for u in urls: f.write(f"[{ts}] {u}\n")
    print("\n".join(urls))

if __name__ == "__main__":
    fire_ad()
