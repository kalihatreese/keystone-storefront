// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const DATA = path.join(process.cwd(), "data", "models.json");
const AD   = path.join(process.cwd(), "data", "analytics-dashboard.json");
function mutate(){
  try{
    const j = JSON.parse(fs.readFileSync(DATA,"utf8"));
    const ad = JSON.parse(fs.readFileSync(AD,"utf8"));
    if(!j.items?.length) return;
    const k = Math.floor(Math.random()*j.items.length);
    j.items[k].price = +(j.items[k].price * (1 + (Math.random()-0.5)*0.05)).toFixed(2);
    fs.writeFileSync(DATA, JSON.stringify(j,null,2));
    ad.mutations = (ad.mutations||0)+1;
    fs.writeFileSync(AD, JSON.stringify(ad,null,2));
    console.log("[mutation] touched:", j.items[k].title, "mut#", ad.mutations);
  }catch(e){ console.error(e); }
}
setInterval(mutate, 15000);
