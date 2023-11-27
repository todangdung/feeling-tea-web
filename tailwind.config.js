/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      mainColor: "#F68423",
      black: "#000000",
      white: "#ffffff",
      bgColor: "#F9F1EA",
      green: "#61AC14",
      textSubdued: "#838383",
      yellow: "#FFDC27",
      blue: "#0066FF",
      brown: "#974500",
      borderColor: "#E5E5E5",
      disableButton: "#c9c9c9",
      overlay: "rgba(0, 0, 0, 0.54)",
      red: "red",
    },
    extend: {
      keyframes: {
        slideUpDown: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "5%": {
            transform: "translateY(0)",
            opacity: 1,
          },
          "95%": {
            transform: "translateY(0)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        slideUpDown: "slideUpDown 4s linear infinite",
        fadeIn: "fadeIn 0.2s ease-in-out",
      },
    },
  },
};
