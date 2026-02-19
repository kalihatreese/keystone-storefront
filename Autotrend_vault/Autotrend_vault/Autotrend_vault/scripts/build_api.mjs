import fs from "node:fs";
import crypto from "node:crypto";

const now = new Date().toISOString();
const MID = crypto.createHash("sha256").update(now).digest("hex").slice(0,12);

fs.mkdirSync("public/api", { recursive: true });

const models = JSON.parse(fs.readFileSync("data/models.json","utf8"));
const analyticsPath = "data/analytics.json";
let analytics = JSON.parse(fs.readFileSync(analyticsPath,"utf8"));

analytics.updated = now;
analytics.totals.pageviews = (analytics.totals.pageviews||0) + 1;

fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2));
fs.writeFileSync("public/api/top-items.json", JSON.stringify({ ok:true, mutation:MID, date: models.date, items: models.items }, null, 2));
fs.writeFileSync("public/api/analytics.json", JSON.stringify(analytics, null, 2));
fs.writeFileSync("public/api/activate.json", JSON.stringify({ ok:true, ts: now, note:"bot ignition placeholder for static hosting" }, null, 2));

try {
  fs.appendFileSync(".IMMORTAL_PAYLOAD", `Word ${now} :: Mutation ${MID} :: api-static emitted\n`);
} catch {}
