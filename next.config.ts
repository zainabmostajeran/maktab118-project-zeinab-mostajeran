import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'http',
        hostname:'localhost',
        port:'8000',
        pathname:'/images/products/images/**',
      },
    ],
  },
};

export default nextConfig;
