/** @type {import('next').NextConfig} */
const config = {
  webpack: (cfg) => {
    cfg.cache = { type: 'memory' };
    cfg.watchOptions = {
      ignored: [
        '/**/proc/**','/**/sys/**','/**/dev/**','/**/apex/**','/**/system/**','/**/storage/**',
        '/data/**','/'
      ],
      aggregateTimeout: 200
    };
    return cfg;
  },
};
export default config;
