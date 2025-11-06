// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
function injectSPDX(dir){
  fs.readdirSync(dir).forEach(f=>{
    const full = path.join(dir,f);
    if(fs.statSync(full).isDirectory()) return injectSPDX(full);
    if(!f.endsWith(".js") && !f.endsWith(".jsx")) return;
    const content = fs.readFileSync(full,"utf8");
    if(content.includes("SPDX-License-Identifier")) return;
    const header = "// SPDX-License-Identifier: RL-Proprietary\n";
    fs.writeFileSync(full, header + content);
    console.log("[spdx] injected:", full);
  });
}
injectSPDX(path.join(process.cwd(),"scripts"));
injectSPDX(path.join(process.cwd(),"pages"));
