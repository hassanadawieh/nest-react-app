/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Update with your file paths
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A0D8EF', // Soft blue
          DEFAULT: '#007ACC', // Bright blue
          dark: '#005A9C', // Dark blue
        },
        secondary: {
          light: '#FFE4B2', // Soft peach
          DEFAULT: '#FF8C00', // Bright orange
          dark: '#C66000', // Dark orange
        },
        accent: {
          light: '#D5A6E1', // Lavender
          DEFAULT: '#8A2BE2', // Deep violet
          dark: '#5E1480', // Dark violet
        },
        neutral: {
          light: '#F3F4F6', // Light gray
          DEFAULT: '#9CA3AF', // Gray
          dark: '#1F2937', // Dark gray
        },
        success: '#4CAF50', // Green
        warning: '#FFC107', // Yellow
        error: '#F44336', // Red
      },
    },
  },
  plugins: [],
};