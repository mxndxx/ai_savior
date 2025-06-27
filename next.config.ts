import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nlab.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
