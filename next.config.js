/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
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

// module.exports = withMDX(nextConfig);
module.exports = nextConfig;
