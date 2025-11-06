// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const AD = path.join(process.cwd(), "data", "analytics-dashboard.json");
function checkRetrain(){
  const ad = JSON.parse(fs.readFileSync(AD,"utf8"));
  if(ad.mutations >= 500){
    console.log("[retrain] threshold hit. Triggering model update...");
  }
}
setInterval(checkRetrain, 60000);
