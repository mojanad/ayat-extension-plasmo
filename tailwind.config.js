/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        "input-background": "var(--input-background)",
        "switch-background": "var(--switch-background)",
        ring: "var(--ring)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"]
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)"
      },
      animation: {
        "toast-in": "toast-in 0.4s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
        "toast-out": "toast-out 0.3s ease-in forwards",
        "fade-up": "fade-up 0.32s cubic-bezier(0.4,0,0.2,1)",
        flash: "flash 0.55s ease-out forwards"
      },
      keyframes: {
        "toast-in": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "toast-out": {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(8px) scale(0.98)" }
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        flash: {
          "0%": { opacity: "0" },
          "20%": { opacity: "0.9" },
          "100%": { opacity: "0" }
        }
      }
    }
  },
  plugins: []
}
