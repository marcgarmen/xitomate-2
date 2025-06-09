module.exports = {
  content: ['./app-xitomate/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'toast-in': {
          '0%':   { opacity: '0', transform: 'translateX(60px)' },
          '10%':  { opacity: '1', transform: 'translateX(0)' },
          '85%':  { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(0)' },
        },
      },
      animation: {
        'toast-in': 'toast-in 4s ease forwards',
      },
    },
  },
  plugins: [],
};