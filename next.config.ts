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
    ],
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; img-src * data: blob:;", // Ensure CSP allows SVGs
  },
};

export default nextConfig;
