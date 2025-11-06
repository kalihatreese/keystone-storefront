// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
#!/usr/bin/env node

const chokidar = require('chokidar');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("🧬 Autonomous Mutator online. Watching for vault mutations...");

const storefront = path.join(__dirname, 'keystone-storefront');

// Watch for changes across the vault
chokidar.watch([
  path.join(storefront, 'app'),
  path.join(storefront, 'pages'),
  path.join(storefront, 'data'),
  path.join(__dirname, 'package.json')
], {
  ignored: /node_modules/,
  persistent: true
}).on('change', (changedPath) => {
  console.log(`🔁 Mutation detected in ${changedPath}`);

  try {
    // Reinstall if package.json changed
    if (changedPath.includes('package.json')) {
      execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
    }

    // Reinject homepage if missing
    const homePath = path.join(storefront, 'app', 'page.tsx');
    if (!fs.existsSync(homePath)) {
      console.log("⚠️ Homepage missing. Reinjection triggered.");
      fs.mkdirSync(path.dirname(homePath), { recursive: true });
      fs.writeFileSync(homePath, `
export default function Home() {
  return (
    <main>
      <h1>Keystone AI Storefront</h1>
      <p>Vault ingestion online. Mutation engine active.</p>
    </main>
  );
}
      `.trim());
    }

    // Reinject checkout if missing
    const checkoutPath = path.join(storefront, 'app', 'checkout', 'page.tsx');
    if (!fs.existsSync(checkoutPath)) {
      console.log("⚠️ Checkout missing. Reinjection triggered.");
      fs.mkdirSync(path.dirname(checkoutPath), { recursive: true });
      fs.writeFileSync(checkoutPath, `
export default function Checkout() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>Secure flow active. Awaiting payload.</p>
    </main>
  );
}
      `.trim());
    }

    // Inject sample products if missing
    const productsPath = path.join(storefront, 'data', 'products.json');
    if (!fs.existsSync(productsPath)) {
      console.log("⚠️ No products found. Injecting sample data...");
      fs.mkdirSync(path.dirname(productsPath), { recursive: true });
      fs.writeFileSync(productsPath, JSON.stringify([
        { id: "chrome-shades", name: "Chrome Shades", price: 49 },
        { id: "neural-thread", name: "Neural Thread Hoodie", price: 89 }
      ], null, 2));
    }

    // Commit and push mutation
    execSync('git add . && git commit -am "🧬 Autonomous mutation $(date)" && git push', { stdio: 'inherit' });

    // Deploy to Vercel
    execSync('npx vercel --prod', { stdio: 'inherit' });

  } catch (err) {
    console.error("💥 Mutation failed:", err.message);
  }
});
