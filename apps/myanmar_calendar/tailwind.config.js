/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["GeistSans", "sans-serif"],
      },
      colors: {
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        gray: {
          0: "hsl(var(--gray-0))",
          50: "hsl(var(--gray-50))",
          75: "hsl(var(--gray-75))",
          100: "hsl(var(--gray-100))",
          150: "hsl(var(--gray-150))",
          200: "hsl(var(--gray-200))",
          250: "hsl(var(--gray-250))",
          300: "hsl(var(--gray-300))",
          450: "hsl(var(--gray-450))",
          400: "hsl(var(--gray-400))",
          500: "hsl(var(--gray-500))",
          600: "hsl(var(--gray-600))",
          700: "hsl(var(--gray-700))",
          800: "hsl(var(--gray-800))",
          900: "hsl(var(--gray-900))",
          950: "hsl(var(--gray-950))",
        },
      },
      spacing: {
        "nav-h": "4.2rem",
        "sidebar-w": "17rem",
        "input-sm": "2rem",
        "input-md": "2.35rem",
        "input-lg": "2.75rem",
      },
      screens: {
        sm: "440px", // tw default
        sm1: "540px",
        sm2: "640px",
        md: "768px", // tw default
        md1: "800px",
        md2: "920px",
        md3: "980px",
        lg: "1024px", // tw default
        lg1: "1064px",
        lg2: "1165px",
        lg3: "1220px",
        xl: "1280px", // tw default
        xl1: "1380px",
        xl2: "1450px",
        xl3: "1536px",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        model: "0 10px 18px 3px rgba(100,100,100,.14), 0 9px 16px 8px rgba(100,100,100,.07), 0 11px 15px -7px rgba(100,100,100,.2)",
        "model-dark":
          "0 10px 15px -3px rgba(0, 0, 0, 0.2),\
    0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // plugins: [require("@tailwindcss/typography")],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
