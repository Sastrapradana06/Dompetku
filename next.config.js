/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    image: {
      quality: 80
    },
  },
}

module.exports = nextConfig

