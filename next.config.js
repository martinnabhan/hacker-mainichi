const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  swcMinify: true,
};

module.exports = process.env.ANALYSE === 'true' ? require('@next/bundle-analyzer')(config) : config;
