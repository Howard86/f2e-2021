import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type{import('next').NextConfig} */
const config = {
  experimental: {
    cpus: 1,
  },
  outputFileTracingRoot: join(dirname(fileURLToPath(import.meta.url)), '../..'),
  reactStrictMode: true,
};

export default config;
