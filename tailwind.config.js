/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx}",
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
};

export default config;
