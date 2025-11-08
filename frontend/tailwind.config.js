/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'vibe-primary': '#FFA500', 
      'vibe-secondary': '#60a5fa', 
    }
  },
  plugins: [],
}

