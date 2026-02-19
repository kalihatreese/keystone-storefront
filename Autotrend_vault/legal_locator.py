#!/usr/bin/env python3
import requests, re, time, csv, argparse
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from urllib import robotparser

UA="LegalPublicRecordsBot/1.0"; TIMEOUT=20; SLEEP=3.0
def clean(s): return re.sub(r"\s+"," ",s or "").strip()

def robots_allows(base, path):
    rp = robotparser.RobotFileParser(); rp.set_url(urljoin(base,"/robots.txt"))
    try: rp.read(); return rp.can_fetch(UA, urljoin(base, path))
    except: return False

def http_get(url, params=None):
    time.sleep(SLEEP)
    r = requests.get(url, params=params, headers={"User-Agent":UA}, timeout=TIMEOUT)
    r.raise_for_status(); return r

def extract_opus(text):
    """Pick the most plausible OPUS/offender number: 5–9 digits."""
    m = re.search(r'\b(\d{5,9})\b', text or "")
    return m.group(1) if m else ""

def find_results_table(soup):
    # Prefer a table whose header contains 'Offender Number' or 'OPUS'
    for tbl in soup.select("table"):
        hdr = clean(" ".join(th.get_text(" ", strip=True) for th in tbl.select("th")))
        if re.search(r'\b(Offender Number|OPUS)\b', hdr, re.I):
            return tbl
    # fallback: the largest table
    tables = soup.select("table")
    return max(tables, key=lambda t: len(t.select("tr"))) if tables else None

def search_nc(first, last):
    base="https://webapps.doc.state.nc.us"; path="/opi/offendersearch.do"
    if not robots_allows(base, path): return []
    resp=http_get(urljoin(base,path), params={"method":"view","searchLastName":last, "searchFirstName":first})
    soup=BeautifulSoup(resp.text,"html.parser")
    tbl = find_results_table(soup)
    if not tbl: return []
    out=[]
    for tr in tbl.select("tr"):
        tds = tr.select("td")
        if len(tds) < 2: continue
        name = clean(tds[0].get_text(" ", strip=True))
        if not name or name.endswith(":"): continue  # skip labels
        docfield = clean(tds[1].get_text(" ", strip=True))
        opus = extract_opus(docfield)
        if not opus:  # try link text or href
            a = tr.select_one("a")
            if a:
                opus = extract_opus(a.get_text(" ", strip=True)) or extract_opus(a.get("href",""))
        if not opus: continue
        a = tr.select_one("a[href]")
        detail = urljoin(base, a["href"]) if a and a.has_attr("href") else ""
        out.append({"name":name, "opus":opus, "detail_url":detail})
    return out

if __name__=="__main__":
    ap=argparse.ArgumentParser()
    ap.add_argument("--first", required=True); ap.add_argument("--last", required=True)
    ap.add_argument("--out", default="results.csv")
    a=ap.parse_args()
    recs=search_nc(a.first.strip(), a.last.strip())
    with open(a.out,"w",newline="",encoding="utf-8") as f:
        w=csv.DictWriter(f, fieldnames=["name","opus","detail_url"]); w.writeheader()
        for r in recs: w.writerow(r)
    print(f"[ok] wrote {a.out} with {len(recs)} rows")
