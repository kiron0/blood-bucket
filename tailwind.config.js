/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: [
      {
        myTheme: {
          primary: "#006A4E",
          secondary: "#F42A41",
          accent: "#1FB2A6",
          neutral: "#191D24",
          info: "#3ABFF8",
          success: "#006A4E",
          warning: "#FBBD23",
          error: "#F42A41",
          "base-100": "#ffffff",
          "base-200": "#FFF0F5",
          "base-300": "#f5f6fa",
        },
      },
      "night",
    ],
  },
  plugins: [require("daisyui")],
};
