// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
/** @type {import('next').NextConfig} */
module.exports = {
  outputFileTracingRoot: __dirname,
  webpack: (config) => {
    // Termux-friendly settings
    config.cache = { type: 'memory' };
    config.watchOptions = {
      poll: 1000,
      ignored: ['**/node_modules/**', '/data/**', '/**'],
    };
    return config;
  },
};
