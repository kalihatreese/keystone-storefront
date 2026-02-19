// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    blacklistRE: exclusionList([
      /dashboard_gui_old\/.*/,
      /store_backup\/.*/,
      /.*\/node_modules\/.*\/node_modules\/.*/, // nested node_modules
    ]),
  },
});
