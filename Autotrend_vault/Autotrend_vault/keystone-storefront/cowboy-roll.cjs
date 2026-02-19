const fs = require('fs'), crypto = require('crypto');
const path = 'data/', file = path + 'top-iter.json';
if (!fs.existsSync(file)) throw new Error('Missing top-iter.json');
const { items, date } = JSON.parse(fs.readFileSync(file));
const TS = new Date().toISOString(), MID = crypto.randomUUID();
const analytics = {
  itemCount: items.length,
  avgPrice: +(items.reduce((a, c) => a + c.price, 0) / items.length).toFixed(2)
};
const models = {
  updated: TS,
  catalog: items.map(({ sku, title, price, category, image, description }) => ({
    sku, title, price, category, image, description, stock: 'inferred', status: 'active'
  }))
};
fs.mkdirSync(path, { recursive: true });
fs.writeFileSync(path + 'analytics-dashboard.json', JSON.stringify(analytics, null, 2));
fs.writeFileSync(path + 'models.json', JSON.stringify(models, null, 2));
fs.writeFileSync('signals.json', JSON.stringify({
  updated: TS,
  items: items.slice(0, 3).map(t => ({ t: t.title || 'SYS', s: 'AT' }))
}, null, 2));
fs.appendFileSync('.IMMORTAL_PAYLOAD', `${TS} | MUTATION ${MID} | top-iter -> ${items.length} items | sources=ebay,bestbuy\n`);
console.log(JSON.stringify({ mutation_id: MID, count: items.length, date }, null, 2));
