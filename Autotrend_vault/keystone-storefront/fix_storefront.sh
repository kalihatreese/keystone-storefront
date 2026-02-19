#!/usr/bin/env bash
set -euo pipefail

echo "🧬 Mutating storefront dependencies..."

# Force LightningCSS to JS fallback
export LIGHTNINGCSS_FORCE_JS=true

# Align React versions for Next + React Native
npm install react@19.2.0 react-dom@19.2.0 react-native@0.81.4 --legacy-peer-deps

# Clean install with legacy peer resolution
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Patch LightningCSS if needed
command -v patch-package >/dev/null || npm install patch-package --legacy-peer-deps
mkdir -p patches
echo "// fallback patch placeholder" > patches/lightningcss+1.21.0.patch

# Validate homepage route
if [[ ! -f app/page.tsx && ! -f pages/index.js ]]; then
  echo "⚠️ No homepage found. Injecting minimal page..."
  mkdir -p app
  cat <<'PAGE' > app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Keystone AI Storefront</h1>
      <p>Vault ingestion online. Mutation engine active.</p>
    </main>
  );
}
PAGE
fi

# Validate checkout route
if [[ ! -f app/checkout/page.tsx && ! -f pages/checkout.js ]]; then
  echo "⚠️ No checkout found. Injecting minimal checkout..."
  mkdir -p app/checkout
  cat <<'CHECKOUT' > app/checkout/page.tsx
export default function Checkout() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>Secure flow active. Awaiting payload.</p>
    </main>
  );
}
CHECKOUT
fi

# Launch with fallback
echo "🚀 Launching storefront..."
PORT="${PORT:-3000}"
npm run dev || npx serve -l "$PORT" public
