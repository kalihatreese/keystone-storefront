// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
export default function handler(req,res){
  const ad = JSON.parse(fs.readFileSync(path.join(process.cwd(),"data","analytics-dashboard.json"),"utf8"));
  const log = fs.readFileSync(path.join(process.cwd(),"data","mutation.log"),"utf8").split("\n").length;
  const forks = fs.readdirSync(process.cwd()).filter(f=>f.startsWith("keystone-fork-")).length;
  res.status(200).json({ mutations: log, forks, monetized: ad?.monetized || 0 });
}
