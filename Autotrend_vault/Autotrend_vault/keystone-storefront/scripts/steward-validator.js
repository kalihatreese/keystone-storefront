// SPDX-License-Identifier: Proprietary
import fs from "fs";
const ROLES = { "cole": "admin", "shadowx": "executor", "guest": "read-only" };

function validateSteward(name, action){
  const role = ROLES[name.toLowerCase()];
  if(!role) return console.error("[validator] unknown steward:", name);
  if(role === "read-only" && action !== "view") return console.error("[validator] insufficient permission:", name);
  console.log(`[validator] ${name} authorized for ${action}`);
}

// Example usage
validateSteward("Cole", "deploy");
validateSteward("Guest", "mutate");
