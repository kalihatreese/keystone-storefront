#!/usr/bin/env python3
import csv, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
SEEDS_CSV = DATA / "products_seeds.csv"
OUT_JSON = DATA / "products.json"

products = []
if SEEDS_CSV.exists():
    with open(SEEDS_CSV, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # require all fields
            if row.get("name") and row.get("price") and row.get("image_url") and row.get("description"):
                products.append({
                    "name": row["name"].strip(),
                    "price": float(row["price"]),
                    "image": row["image_url"].strip(),   # remote or local path
                    "description": row["description"].strip()
                })
else:
    print("⚠️ Missing data/products_seeds.csv")

OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
with open(OUT_JSON, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"✅ Built {len(products)} products -> {OUT_JSON}")
