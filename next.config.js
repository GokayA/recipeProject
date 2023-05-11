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
      {
        hostname: 'images.immediate.co.uk',
      },
    ],
  },
};

module.exports = nextConfig;
