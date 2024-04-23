/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.alias.canvas = false;

    // The modified config object is returned
    return config;
  },
};

export default nextConfig;
