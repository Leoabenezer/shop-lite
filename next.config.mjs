/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  //the change is here, add allowedDevOrigins to the nextConfig object
  allowedDevOrigins: ["/* YOUR IP ADDRESS */"],
};

export default nextConfig;
