/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}', // Adjust paths as necessary
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}', // Add this line to include Shadcn components
  ],
  theme: {
    container: {
      center: true, 
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [require("tailwindcss-animate")],
}
