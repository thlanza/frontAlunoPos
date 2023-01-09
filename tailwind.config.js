/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bakbak: ["Bakbak One", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
        goblin: ["Goblin One", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"]
      },
      colors: {
        mygreen: "#B8D20B",
        myblack: "#2F2E33",
        mydeepgreen: "#0f1b07",
        mygray: "#D5D6D2",
        mygray2: "#BCBABE"
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px"
      }
    },
  },
  plugins: [],
}
