#!/bin/bash

echo "🔧 Injecting Expo SDK 54..."
npm install expo@^54.0.0

echo "🧬 Auto-fixing dependencies..."
npx expo install --fix

echo "🧪 Validating with expo-doctor..."
npx expo-doctor

echo "🧠 Patching sdkVersion in app.json..."
if grep -q '"sdkVersion":' app.json; then
  sed -i '' 's/"sdkVersion": *"[^"]*"/"sdkVersion": "54.0.0"/' app.json && echo "✅ SDK version patched to 54.0.0 in app.json"
else
  echo "⚠️ sdkVersion not found in app.json. No patch applied."
fi

echo "🧹 Cleaning cache and relaunching..."
expo start --clear
