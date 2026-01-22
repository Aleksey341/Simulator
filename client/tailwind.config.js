/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2c5282',
          dark: '#1a202c'
        },
        secondary: {
          DEFAULT: '#2b6cb0',
          light: '#4299e1',
          dark: '#2c5282'
        },
        accent: {
          DEFAULT: '#ed8936',
          light: '#f6ad55',
          dark: '#dd6b20'
        },
        muted: '#718096'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
