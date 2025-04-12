/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        borderRadius: {
          sm: "var(--radius-sm)",
          md: "var(--radius-md)",
          lg: "var(--radius-lg)",
          xl: "var(--radius-xl)",
        },
        fontFamily: {
          sans: ["var(--font-geist-sans)"],
          mono: ["var(--font-geist-mono)"],
        },
      },
    },
    plugins: [
      require("tailwindcss-animate"),
    ],
  };  