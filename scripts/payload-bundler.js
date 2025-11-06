// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const dirs = ["scripts", "pages", "data"];
const out = path.join(process.cwd(), ".IMMORTAL_PAYLOAD");
function bundle(){
  let payload = "";
  dirs.forEach(dir=>{
    fs.readdirSync(path.join(process.cwd(), dir)).forEach(f=>{
      const full = path.join(process.cwd(), dir, f);
      if(fs.statSync(full).isFile()){
        payload += `\n// === ${dir}/${f} ===\n` + fs.readFileSync(full,"utf8");
      }
    });
  });
  fs.writeFileSync(out, payload);
  console.log("[bundler] payload bundled into .IMMORTAL_PAYLOAD");
}
bundle();
