/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/burnout-project.appspot.com/o/**",
      },
    ],
  },
};

module.exports = nextConfig;
