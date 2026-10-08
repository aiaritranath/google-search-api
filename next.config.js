/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/search', destination: '/api/search' }];
  },
};

module.exports = nextConfig;