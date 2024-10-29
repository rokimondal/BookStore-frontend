/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#FFCE1A",
        "secondary" : "#0D0842",
        "textForBlackBG" : "#FFFFF8",
        "blackBG" : "F3F3F3",
        "discount" : "6C6C6C",
        "favorite" : "#FF5841",
      },
      fontFamily : {
        primary : ["Montserrat", "sans-serif"],
        secondary : ["Nunito Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

