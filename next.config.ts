import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Next.js 16.2.6 bug: validator.ts imports AppRouteHandlerRoutes
    // but routes.d.ts is generated without that export.
    // Remove this once the upstream bug is fixed.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
