const withPWA =
  process.env.NODE_ENV === "development" ? null : require("next-pwa")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig

module.exports =
  withPWA &&
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true
    }
  })
