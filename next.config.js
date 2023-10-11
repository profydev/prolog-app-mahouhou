/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["prolog-api.profy.dev"],
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: "14.5.2",
  },
};

module.exports = nextConfig;
