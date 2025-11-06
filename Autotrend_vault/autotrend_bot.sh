#!/data/data/com.termux/files/usr/bin/bash
echo "🧬 Autotrend Bot Activated: $(date)"

cd ~/autotrend_vault/storefront/products

# 🔁 Refresh product feeds
curl -s https://raw.githubusercontent.com/reeselimitedllc/product-feed/main/top50.json -o top50.json
curl -s https://raw.githubusercontent.com/reeselimitedllc/product-feed/main/electronics25.json -o electronics25.json

# 🧹 Patch broken images
jq '.[] |= if .image == "" or .image == null then .image = "https://i.imgur.com/fallback.jpg" else . end' top50.json > top50.tmp && mv top50.tmp top50.json
jq '.[] |= if .image == "" or .image == null then .image = "https://i.imgur.com/fallback.jpg" else . end' electronics25.json > electronics25.tmp && mv electronics25.tmp electronics25.json

# 💰 Validate PayPal injection
grep -q "paypal.com/sdk/js?client-id=" ~/autotrend_vault/index.html \
  && echo "✅ PayPal checkout active" \
  || echo "⚠️ PayPal script missing"

# 🧠 Innovation logic: detect top sellers and mutate layout
jq -s '.[0] + .[1] | sort_by(.sales_volume // 0) | reverse | .[0:5]' top50.json electronics25.json > top_sellers.json
echo "🚀 Top sellers identified and stored"

# 📦 Inject momentum tags
jq '.[] |= .momentum = "🔥 Trending"' top_sellers.json > momentum.tmp && mv momentum.tmp top_sellers.json

# 🧬 Self-healing storefront restart
pkill -f "serve"
serve ~/autotrend_vault -l 8080 &
echo "✅ Storefront restarted with fresh data"
