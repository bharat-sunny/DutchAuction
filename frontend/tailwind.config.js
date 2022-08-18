/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      graydark: '#273444',
      gray: '#8492a6',
      graylight: '#d3dce6',
      backgroundColor: '#F6F2EB',
      buttonColor: '#5362EB',
      white: '#FFFFFF'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  }
};
