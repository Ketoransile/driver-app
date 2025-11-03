module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ethiopian: {
          green: '#009639',
          yellow: '#FEDD00',
          red: '#DA121A'
        },
        dark: {
          bg: '#1a1a1a',
          card: '#2a2a2a',
          border: '#3a3a3a'
        }
      }
    }
  },
  plugins: []
};
