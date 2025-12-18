import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
       
      },
      {
        protocol: "https",
        hostname: "placehold.co",
       
      },
      {
        protocol: "https",
        hostname: "otf.ca",
       
      },
    ],
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; img-src * data: blob:;", // Ensure CSP allows SVGs
  },
  
  // Webpack configuration for server-side dependencies
  webpack: (config, { isServer }) => {
    if (isServer) {
      // For server-side, ignore canvas (not needed for PDF parsing)
      config.resolve.alias.canvas = false;
    }
    return config
  },
};

export default nextConfig;
