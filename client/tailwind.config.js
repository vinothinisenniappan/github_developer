export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0366d6',
        secondary: '#6f42c1',
        accent: '#28a745',
        background: '#ffffff',
        surface: '#f6f8fa',
        border: '#e1e4e8',
        text: {
          primary: '#24292e',
          secondary: '#586069'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
