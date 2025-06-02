/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_V1: process.env.NEXT_PUBLIC_API_V1,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
