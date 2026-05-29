/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      { source: "/realestate", destination: "/", permanent: true },
      { source: "/listings", destination: "/properties", permanent: true },
      { source: "/solutions", destination: "/properties", permanent: true },
      { source: "/solutions/:slug", destination: "/properties", permanent: true },
      { source: "/projects", destination: "/properties", permanent: true },
      { source: "/news", destination: "/about", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      { source: "/construction", destination: "/properties", permanent: true },
      { source: "/tours", destination: "/why-zanzibar", permanent: true },
      { source: "/security", destination: "/properties", permanent: true },
      { source: "/landscaping", destination: "/properties", permanent: true },
    ];
  },
};

export default nextConfig;
