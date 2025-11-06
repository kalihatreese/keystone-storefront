/** @type {import('next').NextConfig} */
const isGH = true;
const basePath = "/Autotrend_vault";
export default {
  output: "export",
  images: { unoptimized: true },
  basePath: isGH ? basePath : "",
  assetPrefix: isGH ? basePath + "/" : "",
  trailingSlash: true
};
