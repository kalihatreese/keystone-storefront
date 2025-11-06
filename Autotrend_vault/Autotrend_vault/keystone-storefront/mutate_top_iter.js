// SPDX-License-Identifier: Proprietary
import fs from 'fs';

const sourcePath = './top-iter.json';
const injectPath = './liveProducts.json';
const dashboardPath = './analytics-dashboard.json';
const modelsPath = './models.json';
const logPath = './.IMMORTAL_PAYLOAD';

const readJson = (p) => {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { console.error('Missing or invalid', p); process.exit(1); }
};

const topIter = readJson(sourcePath);
const liveProducts = readJson(injectPath);

const enriched = topIter.map(function(item, i) {
  const match = liveProducts[i] || {};
  return {
    sku: match.sku || ('GEN-' + (i + 1) + '-X'),
    title: match.title || item.title,
    price: typeof match.price !== 'undefined' ? match.price : item.price,
    image: match.image || item.image,
    description: match.description || 'No description available.',
    category: match.category || 'general'
  };
});

fs.writeFileSync(sourcePath, JSON.stringify(enriched, null, 2));
fs.writeFileSync(dashboardPath, JSON.stringify(enriched, null, 2));
fs.writeFileSync(modelsPath, JSON.stringify(enriched, null, 2));

const logEntry = {
  id: 'TOPITER_MUT_' + new Date().toISOString().replace(/[-:.TZ]/g, ''),
  timestamp: new Date().toISOString(),
  mutated: enriched.length,
  source: sourcePath
};

fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
console.log('✅ Mutation complete. ' + enriched.length + ' items enriched and logged.');
