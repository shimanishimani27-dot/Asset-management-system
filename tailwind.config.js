/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zGreen: "#006400",
        zOrange: "#FF8C00",
        zGold: "#FFD700",
        zBlack: "#000000",
        zRed: "#D32F2F",
      },
    },
  },
  plugins: [],
};
