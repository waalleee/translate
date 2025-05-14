/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0071e3", // Apple-blue
          dark: "#005bb5",
        },
        light: "#f9f9f9",
        soft: "#f2f2f2",
        text: "#1d1d1f",
        subtle: "#6e6e73",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};



