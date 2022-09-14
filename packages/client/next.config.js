const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  swcMinify: true,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = process.env.ANALYSE === 'true' ? require('@next/bundle-analyzer')(config) : config;
