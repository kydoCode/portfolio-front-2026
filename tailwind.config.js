/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      card: {
        backgroundColor: '#fff',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        marginBottom: '1rem',
      },
    },
  },
  plugins: [],
}
