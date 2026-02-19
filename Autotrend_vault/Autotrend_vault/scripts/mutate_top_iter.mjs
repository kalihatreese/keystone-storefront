import fs from "fs";
import path from "path";
import crypto from "crypto";
import axios from "axios";
import * as cheerio from "cheerio";

const DATA_DIR = "data";
const TOPITER = path.join(DATA_DIR, "top-iter.json");
const DASH = path.join(DATA_DIR, "analytics-dashboard.json");
const MODELS = path.join(DATA_DIR, "models.json");
const LOG = ".IMMORTAL_PAYLOAD";

const TS = new Date().toISOString();
const MID = crypto.randomUUID();

function skuFor(title){
  return "GEN-" + crypto.createHash("sha1").update(title).digest("hex").slice(0,10).toUpperCase();
}

async function headOk(url){
  try {
    const r = await axios.head(url, { timeout: 8000, maxRedirects: 5, validateStatus: s => s < 400 });
    const ct = (r.headers["content-type"]||"").toLowerCase();
    return ct.startsWith("image/");
  } catch { return false; }
}

function parsePrice(txt){
  const m = (txt||"").replace(/[, ]/g,"").match(/(\d+(\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

/* Adapters pull "yesterday’s top-selling" or current top-deals equivalents.
   They do not fabricate data. Sources: eBay Deals, Best Buy Top Deals. */
async function fromEbayDeals(){
  const url = "https://www.ebay.com/deals";
  const html = await axios.get(url, { timeout: 20000 }).then(r=>r.data);
  const $ = cheerio.load(html);
  const out = [];
  $(".ebayui-dne-item-featured-card, .dne-itemtile, .dne-itemtile-deal").each((_,el)=>{
    const title = $(el).find(".dne-itemtile-title, .dne-desc, h3").first().text().trim();
    const priceTxt = $(el).find(".dne-itemtile-price, .dne-price, .itemtile-price-bold").first().text().trim();
    const price = parsePrice(priceTxt);
    let image = $(el).find("img").attr("src") || $(el).find("img").attr("data-src") || "";
    if(image && image.startsWith("//")) image = "https:" + image;
    const desc = $(el).find(".dne-itemtile-desc, .dne-desc").first().text().trim() || "eBay Deal";
    if(title && price && image){
      out.push({ title, price, image, description: desc, sku: skuFor(title), category: "general", source:"ebay" });
    }
  });
  return out;
}

async function fromBestBuyTopDeals(){
  const url = "https://www.bestbuy.com/site/top-deals/pcmcat1563307914257.c?id=pcmcat1563307914257";
  const html = await axios.get(url, { timeout: 20000 }).then(r=>r.data);
  const $ = cheerio.load(html);
  const out = [];
  $("[data-sku-id]").each((_,el)=>{
    const title = $(el).find(".sku-title a").first().text().trim();
    const priceTxt = $(el).find(".priceView-customer-price span").first().text().trim();
    const price = parsePrice(priceTxt);
    let image = $(el).find("img").attr("src") || $(el).find("img").attr("data-src") || "";
    if(image && image.startsWith("//")) image = "https:" + image;
    const desc = "Best Buy Top Deal";
    if(title && price && image){
      out.push({ title, price, image, description: desc, sku: skuFor(title), category: "general", source:"bestbuy" });
    }
  });
  return out;
}

async function validateImages(items){
  const checked = [];
  await Promise.all(items.map(async it=>{
    if(await headOk(it.image)) checked.push(it);
  }));
  return checked;
}

function uniqueByTitle(items){
  const seen = new Set();
  return items.filter(x=>{
    const k = x.title.toLowerCase();
    if(seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

async function main(){
  const batches = await Promise.allSettled([
    fromEbayDeals(),
    fromBestBuyTopDeals(),
  ]);
  let items = [];
  for(const b of batches){
    if(b.status==="fulfilled") items = items.concat(b.value);
  }
  items = uniqueByTitle(items).slice(0,100);
  items = await validateImages(items);

  if(items.length === 0){
    console.error("No products harvested. Abort to avoid placeholders.");
    process.exit(2);
  }

  // /top-iter payload
  const topIter = { date: TS.slice(0,10), items };

  // analytics-dashboard enrichment
  const analytics = {
    updated: TS,
    totals: {
      itemCount: items.length,
      avgPrice: Number((items.reduce((a,b)=>a+b.price,0)/items.length).toFixed(2))
    },
    topVendors: Object.entries(items.reduce((m,x)=>{ m[x.source]=(m[x.source]||0)+1; return m;},{}))
      .map(([source,count])=>({source,count})),
    sample: items.slice(0,10).map(({title,price,sku})=>({title,price,sku}))
  };

  // models.json minimal catalog
  const models = {
    updated: TS,
    catalog: items.map(({sku,title,price,category,image,description})=>({
      sku,title,price,category,image,description, stock:"inferred", status:"active"
    }))
  };

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(TOPITER, JSON.stringify(topIter,null,2));
  fs.writeFileSync(DASH, JSON.stringify(analytics,null,2));
  fs.writeFileSync(MODELS, JSON.stringify(models,null,2));

  const logLine = `${TS} | MUTATION ${MID} | top-iter -> ${items.length} items | sources=ebay,bestbuy\n`;
  fs.appendFileSync(LOG, logLine);

  console.log(JSON.stringify({ mutation_id: MID, count: items.length, date: topIter.date }, null, 2));
}

main().catch(e=>{ console.error(e); process.exit(1); });
