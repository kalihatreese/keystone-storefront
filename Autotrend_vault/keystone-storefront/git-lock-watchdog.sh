#!/usr/bin/env bash

LOCK_PATH="$HOME/Autotrend_vault/.git/index.lock"

if [ -f "$LOCK_PATH" ]; then
  echo "🧠 Git lock detected. Removing..."
  rm -f "$LOCK_PATH"
fi

echo "🔁 Running ingestion daemon..."
node ~/Autotrend_vault/keystone-storefront/top-seller-ingestor.js
