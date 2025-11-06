// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/paypal-webhook', (req, res) => {
  const event = req.body;
  console.log('🧬 PayPal Event:', event.event_type);

  if (event.event_type === 'CHECKOUT.ORDER.APPROVED') {
    const buyer = event.resource.payer.name.given_name;
    const item = event.resource.purchase_units[0].description;
    console.log(`✅ ${buyer} bought ${item}`);

    // Trigger ad propagation
    require('./propagate_ad.js')(item);

    // Mutate inventory
    require('./mutate_inventory.js')(item);
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log('🧬 Webhook listening on port 3000'));
