#!/bin/bash
sed -i '' 's/"sdkVersion": *"[^"]*"/"sdkVersion": "54.0.0"/' app.json
echo "✅ SDK version patched to 54.0.0 in app.json"
