/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        myColor1: "#fff34f",
        myColor2: "#002f5e",
        myColor3: "#1E90FF",
        myColor4: "#4B0082",
        myColor5: "#FF0000",
      },
    },
  },
  plugins: [],
};
