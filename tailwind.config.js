/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: '2px',
      },
      colors: {
        primary: "#3ac1c2",
        secondary: "#14b9da",
        dark: "#1f2c62",
      },
    },
  },
  plugins: [],
}

