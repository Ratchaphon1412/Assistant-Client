import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      // เพิ่ม domain อื่นๆ ที่ต้องการ
    ],
  },
};

export default nextConfig;
