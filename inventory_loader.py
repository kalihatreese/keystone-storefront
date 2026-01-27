import json, os

HOME = "/data/data/com.termux/files/home/keystone-storefront/"
INV_PATH = os.path.join(HOME, "50y50y_inventory/")

# Ensure directories exist
os.makedirs(os.path.join(INV_PATH, "electronics"), exist_ok=True)
os.makedirs(os.path.join(INV_PATH, "general"), exist_ok=True)

# T-1 Pulse Data (Initial 50/50 Seed)
electronics_items = [
    {"name": f"Electronic Gear {i}", "cost": 100 + i} for i in range(50)
]
general_items = [
    {"name": f"Household Item {i}", "cost": 20 + i} for i in range(50)
]

with open(os.path.join(INV_PATH, "electronics/today.json"), "w") as f:
    json.dump(electronics_items, f)
with open(os.path.join(INV_PATH, "general/today.json"), "w") as f:
    json.dump(general_items, f)

print(f"[+] 100 Items Materialized in {INV_PATH}")
