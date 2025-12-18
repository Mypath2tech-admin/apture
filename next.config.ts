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
  
  // Webpack configuration to handle pdf-parse worker files
  webpack: (config, { isServer }) => {
    if (isServer) {
      // For server-side, ignore worker files
      config.resolve.alias = {
        ...config.resolve.alias,
        'pdfjs-dist/build/pdf.worker.mjs': false,
      }
    }
    return config
  },
};

export default nextConfig;
