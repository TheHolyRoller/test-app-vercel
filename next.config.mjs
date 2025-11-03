/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com'],
    unoptimized: true
  }, 
   experimental: {
    serverActions: true, // Enable server actions
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip lint step on Vercel build
  },
};

export default nextConfig;
