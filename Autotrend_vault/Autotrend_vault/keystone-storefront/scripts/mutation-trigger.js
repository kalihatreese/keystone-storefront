// SPDX-License-Identifier: Proprietary
import https from "https";
function triggerWebhook(source, payload){
  const data = JSON.stringify({ source, payload });
  const req = https.request({
    hostname: "your-webhook-endpoint.com",
    path: "/mutation",
    method: "POST",
    headers: { "Content-Type": "application/json", "Content-Length": data.length }
  }, res => {
    console.log("[trigger] webhook status:", res.statusCode);
  });
  req.on("error", e => console.error("[trigger] failed:", e));
  req.write(data);
  req.end();
}

// Example usage
triggerWebhook("storefront", { mutation: "checkout", item: "EchoBot" });
