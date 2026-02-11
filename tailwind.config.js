/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'title-color': 'var(--title-color)',
        'dark-red': 'var(--dark-red)',
        'error-color': 'var(--error-color)',
      },
      fontFamily: {
        'h1-font': 'var(--h1-font)',
        'p-font': 'var(--p-font)',
        'text-font': 'var(--text-font)',
        'letter-message-font': 'var(--letter-message-font)',
      },
    },
  },
  plugins: [],
};
