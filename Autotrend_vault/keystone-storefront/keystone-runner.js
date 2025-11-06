// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOCK_PATH = `${process.env.HOME}/Autotrend_vault/.git/index.lock`;
function run(cmd) { console.log(`🔧 ${cmd}`); execSync(cmd, { stdio: 'inherit' }); }

try {
  console.log("🧬 Starting full mutation cycle...");
  if (fs.existsSync(LOCK_PATH)) fs.rmSync(LOCK_PATH);
  run('node top-seller-ingestor.js');

  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json')));
  const cartPath = path.join(__dirname, 'data', 'cart.json');
  const heatmapPath = path.join(__dirname, 'data', 'heatmap.json');
  const logPath = path.join(__dirname, 'data', 'mutation-log.json');
  const vaultPath = path.join(__dirname, 'data', 'webhook-vault.json');
  let topZone = null;

  products.slice(0, 5).forEach((product, i) => {
    const prompt = `Write a viral ad for: ${product.name}. Description: ${product.description || 'No description'}`;
    const aiAd = execSync(`echo "${prompt}" | ollama run mistral`).toString().trim();
    console.log(`📣 [Ad ${i + 1}] ${aiAd}`);

    const discordWebhook = 'https://discord.com/api/webhooks/your_webhook_url';
    const discordPayload = { content: `🔥 ${product.name} just dropped! ${product.description || ''} → ${product.url || 'yourstore.com'}` };
    execSync(`curl -H "Content-Type: application/json" -d '${JSON.stringify(discordPayload)}' ${discordWebhook}`);

    execSync(`echo "🔥 ${product.name} just dropped! ${product.description}" | reddit-cli post --subreddit="streetwearstartup"`);
    execSync(`curl -X POST https://craigslist.org/post -d "title=${product.name}&body=${product.description}&price=${product.price || 'N/A'}"`);

    const captionPrompt = `Write a viral TikTok caption for ${product.name} in 10 words`;
    const caption = execSync(`echo "${captionPrompt}" | ollama run mistral`).toString().trim();
    fs.writeFileSync(path.join(__dirname, 'public', `tiktok-caption-${i}.txt`), caption);
    execSync(`convert public/product-${i}.jpg -gravity South -pointsize 48 -annotate +0+20 "${caption}" public/tiktok-drop-${i}.jpg`);

    const email = {
      subject: `🔥 ${product.name} just dropped`,
      body: `Hey trendsetter — ${product.name} is live. ${product.description}. Tap in → ${product.url || 'yourstore.com'}`
    };
    fs.writeFileSync(path.join(__dirname, 'drip', `email-${i}.json`), JSON.stringify(email, null, 2));

    const replyPrompt = `Write a confident reply to: "Is this worth it?" that reinforces hype around ${product.name}`;
    const reply = execSync(`echo "${replyPrompt}" | ollama run mistral`).toString().trim();
    fs.writeFileSync(path.join(__dirname, 'public', `reply-${i}.txt`), reply);

    const threadPrompt = `Generate a Reddit comment thread reacting to: "${product.name} just dropped!"`;
    const thread = execSync(`echo "${threadPrompt}" | ollama run mistral`).toString().trim();
    fs.writeFileSync(path.join(__dirname, 'public', `reddit-thread-${i}.txt`), thread);
  });

  if (fs.existsSync(cartPath)) {
    const cart = JSON.parse(fs.readFileSync(cartPath));
    if (cart.items.length >= 3) {
      fs.writeFileSync(path.join(__dirname, 'public', 'mutation-banner.html'), `<div class="surge-banner">🔥 Trending Now: ${cart.items[0].name}</div>`);
    }
  }

  if (fs.existsSync(heatmapPath)) {
    const clicks = JSON.parse(fs.readFileSync(heatmapPath));
    const hotspot = clicks.reduce((acc, click) => {
      const key = `${click.path}:${Math.floor(click.x / 100)}:${Math.floor(click.y / 100)}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    topZone = Object.entries(hotspot).sort((a, b) => b[1] - a[1])[0];
    if (topZone) {
      fs.writeFileSync(path.join(__dirname, 'public', 'heatmap-banner.html'), `<div class="hotspot-banner">🔥 Hot Zone: ${topZone[0]}</div>`);
    }
  }

  let logs = [];
  if (fs.existsSync(logPath)) logs = JSON.parse(fs.readFileSync(logPath));
  logs.push({
    timestamp: new Date().toISOString(),
    products: products.slice(0, 5).map(p => p.name),
    cartSurge: fs.existsSync(cartPath) ? JSON.parse(fs.readFileSync(cartPath)).items.length : 0,
    heatmapZone: topZone?.[0] || 'none',
    discord: true, reddit: true, craigslist: true, tiktok: true, email: true
  });
  fs.writeFileSync(logPath, JSON.stringify(logs.slice(-100), null, 2));

  let vault = [];
  if (fs.existsSync(vaultPath)) vault = JSON.parse(fs.readFileSync(vaultPath));
  vault.push({ timestamp: Date.now(), source: 'mutation-runner', trigger: 'cycle-complete' });
  fs.writeFileSync(vaultPath, JSON.stringify(vault.slice(-100), null, 2));

  // 🧬 Layout evolution from vault triggers
  const recentTrigger = vault.slice(-1)[0]?.trigger || '';
  if (recentTrigger.includes('🔥')) {
    fs.writeFileSync(path.join(__dirname, 'public', 'vault-banner.html'), `<div class="vault-banner">🚀 Triggered by: ${recentTrigger}</div>`);
    console.log(`🚀 Layout evolved from vault trigger: ${recentTrigger}`);
  }

  run('git add .');
  run('git commit -am "🧬 Full mutation + propagation + dashboard + vault + layout evolution"');
  run('git push');
  run('npx vercel --prod');

  console.log("✅ Final mutation injected. Empire compounding. No further input needed.");
} catch (err) {
  console.error("💥 Mutation failed:", err.message);
}
