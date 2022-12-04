const path = require('path');

/** @type{import('next').NextConfig} */
const config = {
  swcMinify: true,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../..'),
  },
};

module.exports = config;
