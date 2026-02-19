#!/data/data/com.termux/files/usr/bin/bash

echo "🧬 Keystone Empire Initializer Activated at $(date)" >> ~/boot_log.txt

# Kill any lingering Flask
pkill -f "flask"

# Launch Flask on port 5050
cd ~/autotrend_vault
nohup flask run --host=0.0.0.0 --port=5050 > flask.log 2>&1 &

# Wait for Flask to bind
sleep 3

# Launch Cloudflare Tunnel
nohup cloudflared tunnel --url http://localhost:5050 > tunnel.log 2>&1 &

# Wait for tunnel to generate URL
sleep 5

# Extract tunnel URL
tunnel_url=$(grep -o 'https://.*\.trycloudflare\.com' tunnel.log | head -n 1)

# Log storefront URL
echo "🛍️ Storefront URL: $tunnel_url/vault" > ~/storefront_url.txt
echo "🧬 Storefront live at: $tunnel_url/vault" >> ~/boot_log.txt

# Git sync
bash ~/autotrend_vault/git_sync.sh
