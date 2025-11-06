#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
command -v jq >/dev/null || { echo "jq required: pkg install -y jq"; exit 1; }

# install deps
if [[ -f package-lock.json ]]; then npm ci; elif [[ -f package.json ]]; then npm install; fi

# run scripts if present, else static serve
if jq -er '.scripts.dev' package.json >/dev/null 2>&1; then
  npm run dev
elif jq -er '.scripts.start' package.json >/dev/null 2>&1; then
  npm start
else
  PORT="${PORT:-3000}"
  npx serve -l "$PORT" public
fi
