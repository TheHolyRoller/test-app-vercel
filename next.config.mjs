/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com'],
    unoptimized: true
  }, 
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip lint step on Vercel build
  },
};

export default nextConfig;
