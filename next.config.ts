import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript : {
    ignoreBuildErrors : true
  },
  eslint : {
    ignoreDuringBuilds : true
  }
  /* config options here */
};

export default withPayload(nextConfig);
