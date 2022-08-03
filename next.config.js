const withPWA = require("next-pwa")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true
  }
})
