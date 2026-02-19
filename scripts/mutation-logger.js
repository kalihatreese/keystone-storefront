// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const DATA = path.join(process.cwd(), "data", "models.json");
const LOG  = path.join(process.cwd(), "data", "mutation.log");
function logMutation(){
  try{
    const j = JSON.parse(fs.readFileSync(DATA,"utf8"));
    if(!j.items?.length) return;
    const i = Math.floor(Math.random()*j.items.length);
    const item = j.items[i];
    const entry = `[${new Date().toISOString()}] Mutated: ${item.title} → $${item.price}\n`;
    fs.appendFileSync(LOG, entry);
    console.log("[logger] mutation logged:", item.title);
  }catch(e){ console.error(e); }
}
setInterval(logMutation, 15000);
