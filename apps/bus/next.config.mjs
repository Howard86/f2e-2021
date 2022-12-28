import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/** @type{import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputFileTracingRoot: join(
      dirname(fileURLToPath(import.meta.url)),
      '../..',
    ),
  },
};

export default config;
