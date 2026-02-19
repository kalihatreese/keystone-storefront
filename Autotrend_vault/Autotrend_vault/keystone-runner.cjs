// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
#!/usr/bin/env node
const { execSync } = require('child_process'); const fs = require('fs'); const path = require('path');
console.log("🧬 Keystone AI Store Runner initializing..."); process.env.LIGHTNINGCSS_FORCE_JS = 'true';
execSync('npm install react@19.2.0 react-dom@19.2.0 react-native@0.81.4 --legacy-peer-deps', { stdio: 'inherit' });
execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' }); execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
const homePath = path.join('app', 'page.tsx'); if (!fs.existsSync(homePath)) { fs.mkdirSync('app', { recursive: true });
fs.writeFileSync(homePath, `export default function Home() { return (<main><h1>Keystone AI Storefront</h1><p>Vault ingestion online. Mutation engine active.</p></main>); }`); }
const checkoutPath = path.join('app', 'checkout', 'page.tsx'); if (!fs.existsSync(checkoutPath)) { fs.mkdirSync(path.join('app', 'checkout'), { recursive: true });
fs.writeFileSync(checkoutPath, `export default function Checkout() { return (<main><h1>Checkout</h1><p>Secure flow active. Awaiting payload.</p></main>); }`); }
const productsPath = path.join('data', 'products.json'); if (!fs.existsSync(productsPath)) { fs.mkdirSync('data', { recursive: true });
fs.writeFileSync(productsPath, JSON.stringify([{ id: "chrome-shades", name: "Chrome Shades", price: 49 }, { id: "neural-thread", name: "Neural Thread Hoodie", price: 89 }], null, 2)); }
try { execSync('npm run dev', { stdio: 'inherit' }); } catch { execSync('npx serve -l 3000 public', { stdio: 'inherit' }); }
