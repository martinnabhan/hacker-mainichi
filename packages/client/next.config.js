// eslint-disable-next-line @typescript-eslint/no-var-requires
const { get } = require('env-var');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  swcMinify: true,
  webpack: (config, { defaultLoaders }) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          include: [/packages/],
          test: /\.(ts|tsx)$/,
          use: [defaultLoaders.babel],
        },
      ],
    },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = get('ANALYSE').asBool() ? require('@next/bundle-analyzer')(nextConfig) : nextConfig;
