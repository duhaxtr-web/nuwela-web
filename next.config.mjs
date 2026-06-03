/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => `build-${Date.now()}`,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.fal.media" },
      { protocol: "https", hostname: "**.fal.ai" },
      { protocol: "https", hostname: "v3.fal.media" },
      { protocol: "https", hostname: "fal.media" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
