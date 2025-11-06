#!/usr/bin/env bash
set -euo pipefail

# ---- guardrails --------------------------------------------------------------
proj="$(pwd)"
[ -f package.json ] || { echo "ERR: run inside keystone-storefront (package.json not found)"; exit 1; }

# ---- Termux essentials -------------------------------------------------------
if [ -n "${PREFIX-}" ] && command -v pkg >/dev/null 2>&1; then
  pkg update -y
  pkg install -y nodejs-lts git jq coreutils findutils procps termux-tools python python-numpy python-pandas
fi

# ---- Node/Yarn/npm sane defaults --------------------------------------------
export WATCHPACK_POLLING=1
export CHOKIDAR_USEPOLLING=1
export NODE_OPTIONS="--max_old_space_size=1536"
npm config set fund false >/dev/null 2>&1 || true
npm config set audit false >/dev/null 2>&1 || true
npm config set legacy-peer-deps true >/dev/null 2>&1 || true

# ---- Create data dir and seed files -----------------------------------------
mkdir -p data
[ -f data/top-iter.json ] || cat > data/top-iter.json <<'JSON'
{ "date": "seed", "items": [] }
JSON
[ -f data/models.json ] || echo '{"models":[]}' > data/models.json
[ -f data/analytics.json ] || echo '{"totals":{"items":0}}' > data/analytics.json

# ---- Patch Next.js config (outputFileTracingRoot moved) ----------------------
if [ -f next.config.js ]; then
  tmp="$(mktemp)"
  node -e '
    const fs=require("fs"), p="next.config.js";
    let s=fs.readFileSync(p,"utf8");
    // remove legacy experimental.outputFileTracingRoot
    s=s.replace(/experimental\s*:\s*\{\s*outputFileTracingRoot[^}]*\},?/ms,"");
    // ensure outputFileTracingRoot at top-level
    if(!/outputFileTracingRoot\s*:/.test(s)){
      s=s.replace(/module\.exports\s*=\s*\{/, m=>m+"\n  outputFileTracingRoot: __dirname,");
    }
    // ensure watchOptions for Termux polling
    if(/webpack\s*:\s*\(config\)\s*=>\s*\{/.test(s)){
      s=s.replace(/webpack\s*:\s*\(config\)\s*=>\s*\{\s*([\s\S]*?)return config;[\s\S]*?\}/m,
        (m,inner)=>`webpack: (config) => {\n  config.watchOptions={ignored:["**/node_modules/**"], poll:1000};\n  ${inner}\n  return config;\n}`);
    } else {
      s=s.replace(/module\.exports\s*=\s*\{/, m=>m+'\n  webpack:(config)=>{config.watchOptions={ignored:["**/node_modules/**"],poll:1000};return config;},');
    }
    fs.writeFileSync(p,s);
  '
fi

# ---- Ensure API route returns stable object shape ---------------------------
mkdir -p pages/api
if [ ! -f pages/api/top-items.js ]; then
  cat > pages/api/top-items.js <<'JS'
import fs from 'fs';
export default function handler(req,res){
  try{
    const raw = fs.readFileSync('data/top-iter.json','utf8');
    const j = JSON.parse(raw);
    const items = Array.isArray(j)? j : (j.items || []);
    const date  = Array.isArray(j)? null : (j.date || null);
    res.status(200).json({ date, items });
  }catch(e){
    res.status(200).json({ date:null, items:[] });
  }
}
export const config = { api: { bodyParser: false } };
JS
fi

# ---- Optional page to visually inspect items --------------------------------
mkdir -p pages
if [ ! -f pages/top-items.jsx ]; then
  cat > pages/top-items.jsx <<'JSX'
import {useEffect,useState} from 'react';
export default function TopItems(){
  const [data,setData]=useState({date:null,items:[]});
  useEffect(()=>{ fetch('/api/top-items').then(r=>r.json()).then(setData).catch(()=>{}); },[]);
  return (<main style={{fontFamily:"system-ui",padding:16}}>
    <h1>Top Items</h1>
    <p>Date: {String(data.date)}</p>
    <p>Count: {data.items.length}</p>
    <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(data.items,null,2)}</pre>
  </main>);
}
JSX
fi

# ---- Minimal health endpoint -------------------------------------------------
if [ ! -f pages/api/health.js ]; then
  cat > pages/api/health.js <<'JS'
export default function handler(req,res){
  res.status(200).json({ ok:true, service:"storefront", ts: Date.now() });
}
JS
fi

# ---- Dependencies ------------------------------------------------------------
# If lockfile exists use ci, else install. Retry once on failure.
install_deps () {
  if [ -f package-lock.json ]; then
    npm ci || (rm -rf node_modules && npm ci)
  else
    npm i || (rm -rf node_modules && npm i)
  fi
}
install_deps

# ---- Porting + PM2 setup -----------------------------------------------------
PORT_STORE="${PORT_STORE-3020}"
cat > ecosystem.config.js <<EOF
module.exports = {
  apps: [
    { name: "storefront", script: "npm", args: "run dev -- --port ${PORT_STORE}", env: { "PORT": "${PORT_STORE}", "WATCHPACK_POLLING":"1", "CHOKIDAR_USEPOLLING":"1" } }
  ]
}
EOF

# ---- Start/Restart with PM2 --------------------------------------------------
if ! command -v pm2 >/dev/null 2>&1; then npm i -g pm2; fi
pm2 delete storefront >/dev/null 2>&1 || true
pm2 start ecosystem.config.js
pm2 save

# ---- Smoke tests -------------------------------------------------------------
echo "[health] curl http://127.0.0.1:${PORT_STORE}/api/health || true"
curl -s "http://127.0.0.1:${PORT_STORE}/api/health" || true
echo
echo "[top-items] curl http://127.0.0.1:${PORT_STORE}/api/top-items | jq '.date, (.items|length)' || true"
curl -s "http://127.0.0.1:${PORT_STORE}/api/top-items" | jq '.date, (.items|length)' || true

echo
echo "OK: storefront running on :${PORT_STORE}"
pm2 ls
