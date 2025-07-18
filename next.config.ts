/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'work-test-web-2024-eze6j4scpq-lz.a.run.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;