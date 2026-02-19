// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("📦 Ingesting yesterday's top sellers...");

// Sample payloads — replace with real ingestion logic later
const generalProducts = [
  "Ashwagandha Gummies", "Blue Light Glasses", "Weighted Blanket", "Nano Tape", "Ergonomic Chair",
  "Air Fryer", "CBD Balm", "LED Light Strips", "Melatonin Gummies", "Yoga Pants"
];

const electronics = [
  "TAGRY Bluetooth Headphones", "Apple AirPods Pro 2", "Bose Ultra Open Earbuds", "Smartwatch",
  "Fitness Tracker", "Smart Lock", "Power Bank", "Instant Pot Duo", "Digital Kitchen Scale", "Wireless Earbuds"
];

// Combine and format
const products = [...generalProducts, ...electronics].map((name, i) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  name,
  price: Math.floor(Math.random() * 100) + 20
}));

// Inject into storefront
const productsPath = path.join(__dirname, 'keystone-storefront', 'data', 'products.json');
fs.mkdirSync(path.dirname(productsPath), { recursive: true });
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

console.log(`✅ Injected ${products.length} products.`);

// Commit and deploy
try {
  execSync('git add . && git commit -am "📦 Ingested yesterday\'s top sellers" && git push', { stdio: 'inherit' });
  execSync('npx vercel --prod', { stdio: 'inherit' });
  console.log("🚀 Storefront deployed with fresh inventory.");
} catch (err) {
  console.error("💥 Mutation failed:", err.message);
}
