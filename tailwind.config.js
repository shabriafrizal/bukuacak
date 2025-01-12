/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B2545",
        secondary: "#13315c",
        bluelight: "#134074",
        bluesea: "#17496F",
        light1: "#EEF4ED",
        light2: "#8DA9C4",
        dark1: "#1a1a1a",
        dark2: "#030A12",
      },
    },
  },
  plugins: [],
};
