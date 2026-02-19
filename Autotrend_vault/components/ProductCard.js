// SPDX-License-Identifier: Proprietary
// Copyright (c) 2025 ReeseLimitedLLC. All rights reserved.
// SPDX-License-Identifier: LicenseRef-ReeseLimitedLLC-Proprietary
export default function ProductCard({
  title,
  blurb,
  upsell,
  image,
  link,
  trackClick,
}) {
  return (
    <div className="card">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h2 className="text-xl font-bold chrome-text">{title}</h2>
      <p className="text-sm mb-2">{blurb}</p>
      <p className="text-xs text-steel italic mb-2">{upsell}</p>
      <a
        href={link}
        onClick={() => trackClick(title)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Buy Now
      </a>
    </div>
  );
}
