// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const header = \`// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary\n\`;
function propagate(dir){
  fs.readdirSync(dir).forEach(f=>{
    const full = path.join(dir,f);
    if(fs.statSync(full).isDirectory()) return propagate(full);
    if(!f.endsWith(".js") && !f.endsWith(".jsx")) return;
    const content = fs.readFileSync(full,"utf8");
    if(content.includes("SPDX-License-Identifier")) return;
    fs.writeFileSync(full, header + content);
    console.log("[license] injected:", full);
  });
}
propagate(path.join(process.cwd(),"scripts"));
propagate(path.join(process.cwd(),"pages"));
