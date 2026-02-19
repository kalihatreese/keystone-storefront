// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chrome: "#d1d5db",
        midnight: "#0f172a",
        impala: "#1e293b",
        neon: "#00ffff",
        steel: "#64748b",
      },
      fontFamily: {
        lowrider: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
