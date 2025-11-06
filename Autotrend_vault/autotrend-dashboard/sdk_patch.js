// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
const fs = require('fs');
const path = './app.json';
const config = JSON.parse(fs.readFileSync(path, 'utf8'));
config.expo.sdkVersion = '54.0.0';
fs.writeFileSync(path, JSON.stringify(config, null, 2));
console.log('✅ SDK version patched to 54.0.0 in app.json');
