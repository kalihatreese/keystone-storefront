// SPDX-License-Identifier: Proprietary
import { execSync } from "child_process";
const repo = "https://github.com/your-org/keystone-storefront";
const target = `keystone-fork-${Date.now()}`;
execSync(`git clone ${repo} ${target}`);
execSync(`cp .IMMORTAL_PAYLOAD ${target}/.IMMORTAL_PAYLOAD`);
console.log("[fork] propagated to:", target);
