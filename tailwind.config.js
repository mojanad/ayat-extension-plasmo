/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      animation: {
        "toast-in": "toast-in 0.4s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
        "toast-out": "toast-out 0.3s ease-in forwards"
      },
      keyframes: {
        "toast-in": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "toast-out": {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(8px) scale(0.98)" }
        }
      }
    }
  },
  plugins: []
}
