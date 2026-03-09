import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "www.indheal.com" },
      { protocol: "https", hostname: "www.psghospitals.com" },
      { protocol: "https", hostname: "www.gangahospital.com" },
      { protocol: "https", hostname: "www.gknmhospital.org" },
      { protocol: "https", hostname: "www.sriramakrishnahospital.com" },
      { protocol: "https", hostname: "www.royalcarehospital.in" },
      { protocol: "https", hostname: "static.toiimg.com" },
      { protocol: "https", hostname: "www.kghospital.com" },
      { protocol: "https", hostname: "www.kongunad.com" },
      { protocol: "https", hostname: "www.motherhoodindia.com" }
    ],
  },
};

export default nextConfig;
