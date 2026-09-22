/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./269/src/**/*.{js,ts,jsx,tsx}", // Agar kodlar 269 papkasi ichida bo'lsa
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}