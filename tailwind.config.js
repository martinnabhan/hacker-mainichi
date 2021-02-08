const isProduction = process.env['npm_lifecycle_event'] === 'build';

module.exports = {
  darkMode: 'media',
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
        'body-dark': '#18191a',
        'border-color': '#f0f0f0',
        'border-color-dark': '#3e3e3f',
        'secondary-dark': '#252526',
        primary: '#506bf0',
        subtitle: '#8a94a6',
        'subtitle-dark': '#9c9ea2',
        title: '#333333',
        'title-dark': '#e7e8ed',
      },
      screens: {
        'hover-hover': { raw: '(hover: hover)' },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['dark'],
    },
  },
};
