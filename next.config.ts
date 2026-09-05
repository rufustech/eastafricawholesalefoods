import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimize image delivery
    formats: ["image/avif", "image/webp"],

    // Configure breakpoints for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Quality levels for different formats
    qualities: [75, 100],
  },
};

export default nextConfig;
