// SPDX-License-Identifier: Proprietary
import fs from "fs";
const LOG = "data/audit.log";

function logAction(action){
  const entry = `[${new Date().toISOString()}] Steward: ${action}\n`;
  fs.appendFileSync(LOG, entry);
  console.log("[audit] action logged:", action);
}

// Example usage
logAction("vault replicated");
logAction("public deploy");
logAction("model retrain");
