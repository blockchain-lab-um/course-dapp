/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  nextConfig,
  assetPrefix: !debug ? '/course-dapp/' : '',
};
