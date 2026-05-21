/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/*/.{js,ts,jsx,tsx}",
    "./components/*/.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavie: {
          black: "#0b0b0b",
          charcoal: "#151515",
          gold: "#b38a52",
          cream: "#f5f0e8",
          muted: "#9d9488",
        },
      },
    },
  },
  plugins: [],
};