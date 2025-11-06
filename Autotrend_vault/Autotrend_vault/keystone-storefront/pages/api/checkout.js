// SPDX-License-Identifier: Proprietary
export default function handler(req, res) {
  const { item, price } = req.body;
  const { itemId, quantity } = req.body || {};
  if (!itemId || !quantity) {
    console.warn("[checkout] Missing params:", itemId, quantity);
    return res.status(400).json({ error: "Missing itemId or quantity" });
  }
  const { itemId, quantity } = req.body || {};
  const { itemId, quantity } = req.body || {};
  if (!itemId || !quantity) {
    console.warn("[checkout] Missing params:", itemId, quantity);
    return res.status(400).json({ error: "Missing itemId or quantity" });
  }
  if (!itemId || !quantity) {
    console.warn("[checkout] Missing params:", itemId, quantity);
    return res.status(400).json({ error: "Missing itemId or quantity" });
  }
  console.log("[checkout] requested:", item, price);
  res.status(200).json({ status: "pending", item, price });
}
