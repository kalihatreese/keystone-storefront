// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
const heatmap=require("./analytics-dashboard.json");const directive=require("./.gh/mutation-directive.json");function priceModel(m){if(m.name==="Keystone Echo"||m.tags.includes("legacy"))return"Priceless";const mo=heatmap[m.id]?.clicks||0;const cf=directive.actions.compound==="momentum"?1.5:1;return`$${Math.floor(20+mo*cf)}`;}
