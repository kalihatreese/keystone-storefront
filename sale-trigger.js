// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("🧾 Sale Trigger online. Watching for first sale...");

const logPath = path.join(__dirname, 'paypal_sales.log');
const homepagePath = path.join(__dirname, 'keystone-storefront', 'app', 'page.tsx');

let mutated = false;

setInterval(() => {
  if (!fs.existsSync(logPath)) return;

  const log = fs.readFileSync(logPath, 'utf-8');
  if (log.includes('SALE_CONFIRMED') && !mutated) {
    console.log("💰 First sale detected. Mutating homepage...");

    fs.writeFileSync(homepagePath, `
export default function Home() {
  return (
    <main>
      <h1>🔥 Keystone AI Storefront</h1>
      <p>Now Live. First sale confirmed. Momentum compounding.</p>
    </main>
  );
}
    `.trim());

    execSync('git add . && git commit -am "🔥 First sale mutation" && git push', { stdio: 'inherit' });
    execSync('npx vercel --prod', { stdio: 'inherit' });

    mutated = true;
  }
}, 10000); // checks every 10 seconds
