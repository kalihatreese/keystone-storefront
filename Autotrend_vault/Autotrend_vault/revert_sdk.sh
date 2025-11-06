#!/bin/bash

echo "🔁 Reverting to Expo SDK 50..."

# Reinstall SDK 50
npm install expo@^50.0.0

# Auto-fix dependencies
npx expo install --fix

# Patch app.json
if grep -q '"sdkVersion":' app.json; then
  sed -i '' 's/"sdkVersion": *"[^"]*"/"sdkVersion": "50.0.0"/' app.json && echo "✅ Reverted sdkVersion to 50.0.0 in app.json"
else
  echo "⚠️ sdkVersion not found in app.json. No patch applied."
fi

# Clean and relaunch
npx expo start --clear
