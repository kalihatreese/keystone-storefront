// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
import "./globals.css";

export const metadata = {
  title: "Keystone AI Storefront",
  description: "Vault-ingesting, mutation-powered storefront",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-[#d4d4d4] font-[Orbitron]">
        {children}
      </body>
    </html>
  );
}
