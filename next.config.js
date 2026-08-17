/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

module.exports = nextConfig;
