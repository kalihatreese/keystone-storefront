// SPDX-License-Identifier: Proprietary
import fs from "fs"; import path from "path";
const PRED = path.join(process.cwd(), "data", "predictions.csv");
const LOG  = path.join(process.cwd(), "data", "breakout.log");
function scoreBreakouts(){
  const lines = fs.readFileSync(PRED,"utf8").split("\n").slice(1);
  const ranked = lines.map(l=>{
    const [ticker,prob] = l.split(",");
    return {ticker, score: parseFloat(prob)};
  }).filter(r=>r.score>0.7).sort((a,b)=>b.score-a.score);
  const top = ranked.slice(0,5);
  const entry = `[${new Date().toISOString()}] Top Breakouts: ${top.map(t=>`${t.ticker} (${t.score})`).join(", ")}\n`;
  fs.appendFileSync(LOG, entry);
  console.log("[scorer] breakout scores logged");
}
setInterval(scoreBreakouts, 60000);
