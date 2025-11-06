// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
const fs = require('fs');
const path = require('path');

console.log("🚀 Autotrend ad bot activated.");

// Load top sellers
const dataPath = path.join(__dirname, 'data', 'products.json');
if (!fs.existsSync(dataPath)) {
  console.error("❌ No products found. Skipping ad bot.");
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(dataPath));
const top5 = products.slice(0, 5);

top5.forEach((product, i) => {
  const ad = `🔥 ${product.name} just dropped! ${product.description || ''} Get it now at ${product.url || 'yourstore.com'} #Autotrend`;
  console.log(`📣 [Ad ${i + 1}] ${ad}`);
  // TODO: Inject into Reddit, Discord, Craigslist, etc.
});
