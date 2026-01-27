from flask import Flask, send_from_directory
import json, os

app = Flask(__name__)
HOME = "/data/data/com.termux/files/home/keystone-storefront/"
INV_PATH = os.path.join(HOME, "50y50y_inventory/")

def get_product_image(name):
    # Switching to Unsplash Source for higher reliability on ReeseDroid
    query = name.replace(" ", "-").lower()
    return f"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80"

@app.route('/')
def home():
    try:
        with open(os.path.join(HOME, "index.html"), "r") as f:
            html = f.read()
        
        shards = {'electronics': 'elec-target', 'general': 'gen-target'}
        for shard_name, target in shards.items():
            items = []
            try:
                with open(os.path.join(INV_PATH, f"{shard_name}/today.json"), "r") as f:
                    data = json.load(f)
            except: data = []

            for i in data:
                # FIX: Force 2 decimal places for currency precision
                retail = "{:.2f}".format(i['cost'] * 1.4)
                img = get_product_image(i['name'])
                card = f"""
                <div class='item-card' style='background:#111; border:1px solid #222; margin-bottom:20px; border-radius:8px; overflow:hidden;'>
                    <img src='{img}' style='width:100%; height:180px; object-fit:cover; border-bottom:1px solid #222;'>
                    <div style='padding:15px;'>
                        <div style='color:#fff; font-weight:bold; margin-bottom:5px;'>{i['name']}</div>
                        <div style='display:flex; justify-content:space-between; align-items:center;'>
                            <span style='color:#00ff41; font-size:1.2em; font-family:monospace;'>${retail}</span>
                            <button onclick="window.location.href='/checkout'" style='background:#00ff41; color:#000; border:none; padding:8px 15px; border-radius:4px; font-weight:bold; cursor:pointer;'>BUY NOW</button>
                        </div>
                    </div>
                </div>
                """
                items.append(card)
            
            # Use specific div classes for injection
            html = html.replace(f'<div class="grid">/* INJECTED BY KERNEL */</div>', f'<div class="grid">{"".join(items)}</div>', 1)

        return html
    except Exception as e:
        return f"V92_RENDER_ERR: {str(e)}"

@app.route('/checkout')
def checkout():
    print('[SENTINEL] ALERT: Purchase intent detected on V92 Rail.')
    with open(os.path.join(HOME, "checkout.html"), "r") as f:
        return f.read()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
