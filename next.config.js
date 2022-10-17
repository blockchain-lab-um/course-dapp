/** @type {import('next').NextConfig} */

require('dotenv').config;

const nextConfig = {
  reactStrictMode: true,
};

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  nextConfig,
  assetPrefix: !debug ? '/course-dapp/' : '',
  basePath: !debug ? '/course-dapp' : '',
  env: {
    SNAP_ID: process.env.SNAP_ID,
    RPC_URL: process.env.RPC_URL,
    VC_ISSUER: process.env.VC_ISSUER,
    BACKEND_URL: process.env.BACKEND_URL,
  },
};
