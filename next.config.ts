import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Quiosco Next Configuration */
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname:'res.cloudinary.com'
        },
        {
          protocol: 'https',
          hostname:'images.unsplash.com'
        }
      ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
