const isProduction = process.env['npm_lifecycle_event'] === 'build';

module.exports = {
  darkMode: false,
  purge: {
    content: ['./src/**/*.tsx'],
    enabled: isProduction,
    mode: 'all',
    options: {
      keyframes: true,
      safelist: [
        'sm:w-4/12',
        'sm:w-5/12',
        'sm:w-6/12',
        'sm:w-7/12',
        'sm:w-8/12',
        'sm:w-9/12',
        'sm:w-10/12',
        'sm:w-11/12',
      ],
    },
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
