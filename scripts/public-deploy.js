// SPDX-License-Identifier: Proprietary
import { execSync } from "child_process";
import fs from "fs";
const LOG = "data/deploy.log";
function deploy(){
  try {
    execSync("vercel --prod");
    const entry = `[${new Date().toISOString()}] Public deploy triggered\n`;
    fs.appendFileSync(LOG, entry);
    console.log("[deploy] storefront deployed publicly");
  } catch (e) {
    console.error("[deploy] failed:", e);
  }
}
deploy();
