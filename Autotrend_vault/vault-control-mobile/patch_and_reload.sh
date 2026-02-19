#!/bin/bash

echo "🔧 Injecting CLI dependency..."
npm install --save-dev @react-native-community/cli@latest

echo "📁 Checking android directory..."
if [ -d "android" ]; then
  echo "🧹 Cleaning Android build artifacts..."
  cd android && ./gradlew clean && cd ..
else
  echo "⚠️ android/ directory not found. Skipping clean."
fi

echo "🚀 Relaunching React Native Android app..."
./node_modules/.bin/react-native run-android
