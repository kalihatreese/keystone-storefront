// SPDX-License-Identifier: Proprietary
import { execSync } from "child_process";
import fs from "fs";
const LOG = "data/retrain.log";
function retrain(){
  try {
    execSync("python3 breakout_ai_free.py");
    const entry = `[${new Date().toISOString()}] Retrain triggered\n`;
    fs.appendFileSync(LOG, entry);
    console.log("[retrain] model retrain executed");
  } catch (e) {
    console.error("[retrain] failed:", e);
  }
}
retrain();
