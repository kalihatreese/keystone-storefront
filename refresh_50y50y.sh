#!/bin/bash
# 50y50y Automated Inventory Pulse
echo "[*] Triggering T-1 Scrape for $(date)"
# This calls the inventory loader we built earlier
python3 ~/keystone-storefront/inventory_loader.py
echo "[+] Shards Updated. Restarting Server Pulse..."
pkill -f v92_live_server.py
python3 ~/keystone-storefront/v92_live_server.py > ~/store.log 2>&1 &
echo "[!] 50y50y Storefront Re-Aligned."
