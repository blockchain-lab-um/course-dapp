module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      darkturqoise: '#379683',
      turqoise: '#83c5be',
      lightblue: '#60efff',
      lightgreen: '#8EE4AF',
      gray: '#edf6f9',
      pink: '#ffddd2',
      brown: '#e29578',
      green: '#5CDB95',
      blue: '#05386B',
      white: '#EDF5E1',
    },
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
