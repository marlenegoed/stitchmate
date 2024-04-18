/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    {buildId, dev, isServer, defaultLoaders, nextRuntime, webpack}
  ) => {
    config.module.rules.push({
      test: /\.(mp3)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    });
    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
