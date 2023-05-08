/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'placehold.co',
      },
      {
        hostname: 'images.deliveryhero.io',
      },
    ],
  },
};

module.exports = nextConfig;
