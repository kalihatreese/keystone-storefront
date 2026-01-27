#!/bin/bash
echo "--- Veritas System Inspection: V92 Storefront ---"
echo "1. Path Check:"
which next || echo "Next binary not in PATH"

echo "2. Local Binary Check:"
[ -f "./node_modules/.bin/next" ] && echo "Next binary found in local node_modules" || echo "Local Next binary MISSING"

echo "3. Dependency Audit (Top Level):"
ls -F | grep /

echo "4. Vault Deep-Link Verification:"
ls -F Autotrend_vault/

echo "5. Package Script Extraction:"
grep '"scripts":' package.json -A 10

echo "6. Environment Integrity:"
node -v && npm -v
