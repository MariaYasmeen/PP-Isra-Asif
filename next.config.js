/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Required for Firebase static hosting
  trailingSlash: true, // ✅ Better for static hosting
  images: {
    unoptimized: true, // ✅ Required for static export
  },

  async headers() {
    return [
      {
        source: "/api/sb-contact",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
