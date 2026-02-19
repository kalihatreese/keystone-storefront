// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const DATA = path.join(process.cwd(), "data", "models.json");
function markSale(){
  try{
    const j = JSON.parse(fs.readFileSync(DATA,"utf8"));
    if(!j.items?.length) return;
    const i = Math.floor(Math.random()*j.items.length);
    j.items[i].price = +(j.items[i].price * 0.97).toFixed(2);
    fs.writeFileSync(DATA, JSON.stringify(j,null,2));
    console.log("[sale-trigger] discounted:", j.items[i].title);
  }catch(e){ console.error(e); }
}
setInterval(markSale, 45000);
