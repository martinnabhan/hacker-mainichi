const isProd = process.env['npm_lifecycle_event'] === 'build';

module.exports = {
  darkMode: false,
  purge: {
    content: ['./src/**/*.tsx'],
    enabled: isProd,
  },
  theme: {
    extend: {
      colors: {
        body: '#fafafa',
        borderColor: '#f0f0f0',
        primary: '#506bf0',
        subtitle: '#8a94a6',
        title: '#333333',
        visited: '#00d183',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
    },
  },
};
