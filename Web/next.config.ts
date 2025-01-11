import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com", "picsum.photos", "loremflickr.com", "utfs.io", "unsplash.com"], // Dış alan adını buraya ekleyin
  },
};

export default nextConfig;