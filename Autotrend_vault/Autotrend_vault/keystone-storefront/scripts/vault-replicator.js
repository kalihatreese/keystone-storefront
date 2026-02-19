// SPDX-License-Identifier: Proprietary
import { execSync } from "child_process";
const src = "Autotrend_vault";
const dst = `Vault_Replica_${Date.now()}`;
execSync(`cp -r ${src} ${dst}`);
execSync(`cp ${src}/keystone-storefront/.IMMORTAL_PAYLOAD ${dst}/keystone-storefront/.IMMORTAL_PAYLOAD`);
console.log("[vault] replicated to:", dst);
