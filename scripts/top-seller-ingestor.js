// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const DATA = path.join(process.cwd(), "data", "models.json");
const AD   = path.join(process.cwd(), "data", "analytics-dashboard.json");
function yesterday(){ const d=new Date(Date.now()-86400000); return d.toISOString().slice(0,10); }
function synth(count=100){
  const items=[];
  for(let i=0;i<count;i++){
    const cat = i%2===0?"general":"electronics";
    items.push({title:`${cat.toUpperCase()}_${i}`, price: +(10+(i%100)+Math.random()).toFixed(2), category:cat});
  }
  return items;
}
function run(){
  const date = yesterday();
  const items = synth(100); // hook: replace with real fetchers
  fs.writeFileSync(DATA, JSON.stringify({date, items}, null, 2));
  const totals = {count:items.length, electronics: items.filter(x=>x.category==="electronics").length, general: items.filter(x=>x.category==="general").length};
  fs.writeFileSync(AD, JSON.stringify({date, totals, mutations:0}, null, 2));
  console.log("[ingestor] refreshed", date, totals);
}
run(); setInterval(run, 60*60*1000);
