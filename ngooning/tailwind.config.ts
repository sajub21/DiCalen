import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neumorphic color palette
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Custom neumorphic colors
        neu: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        surface: {
          light: "#f0f0f3",
          DEFAULT: "#e6e7ee",
          dark: "#d1d9e6",
        },
        shadow: {
          light: "rgba(255, 255, 255, 0.7)",
          dark: "rgba(163, 177, 198, 0.4)",
        },
        goon: {
          primary: "#667eea",
          secondary: "#764ba2",
          accent: "#f093fb",
        }
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        neu: "20px",
        "neu-sm": "12px",
        "neu-lg": "28px",
      },
      boxShadow: {
        // Neumorphic shadows
        "neu-sm": "2px 2px 4px rgba(163, 177, 198, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.7)",
        "neu": "4px 4px 8px rgba(163, 177, 198, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.7)",
        "neu-lg": "8px 8px 16px rgba(163, 177, 198, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.7)",
        "neu-xl": "12px 12px 24px rgba(163, 177, 198, 0.4), -12px -12px 24px rgba(255, 255, 255, 0.7)",
        "neu-inset": "inset 2px 2px 4px rgba(163, 177, 198, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.7)",
        "neu-inset-lg": "inset 4px 4px 8px rgba(163, 177, 198, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.7)",
        // Dark mode shadows
        "neu-dark": "4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(50, 50, 50, 0.1)",
        "neu-dark-inset": "inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(50, 50, 50, 0.1)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "bounce-gentle": "bounce-gentle 2s infinite",
        "pulse-gentle": "pulse-gentle 3s ease-in-out infinite",
        "neu-press": "neu-press 0.1s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "neu-press": {
          "0%": { boxShadow: "4px 4px 8px rgba(163, 177, 198, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.7)" },
          "100%": { boxShadow: "inset 2px 2px 4px rgba(163, 177, 198, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.7)" },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom neumorphic utilities
    function({ addUtilities }: any) {
      const newUtilities = {
        '.neu-flat': {
          backgroundColor: '#e6e7ee',
          boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.7)',
          borderRadius: '20px',
        },
        '.neu-pressed': {
          backgroundColor: '#e6e7ee',
          boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
          borderRadius: '20px',
        },
        '.neu-floating': {
          backgroundColor: '#e6e7ee',
          boxShadow: '8px 8px 16px rgba(163, 177, 198, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.7)',
          borderRadius: '20px',
        },
        '.neu-card': {
          backgroundColor: '#e6e7ee',
          boxShadow: '6px 6px 12px rgba(163, 177, 198, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.7)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.neu-input': {
          backgroundColor: '#e6e7ee',
          boxShadow: 'inset 3px 3px 6px rgba(163, 177, 198, 0.4), inset -3px -3px 6px rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
        },
        '.neu-button': {
          backgroundColor: '#e6e7ee',
          boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          transition: 'all 0.1s ease',
        },
        '.neu-button:active': {
          boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
        },
        '.neu-tab': {
          backgroundColor: 'transparent',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
        },
        '.neu-tab-active': {
          backgroundColor: '#e6e7ee',
          boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
        },
        // Dark mode neumorphic utilities
        '.dark .neu-flat': {
          backgroundColor: '#2d3748',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(50, 50, 50, 0.1)',
        },
        '.dark .neu-pressed': {
          backgroundColor: '#2d3748',
          boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(50, 50, 50, 0.1)',
        },
        '.dark .neu-floating': {
          backgroundColor: '#2d3748',
          boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(50, 50, 50, 0.1)',
        },
        '.dark .neu-card': {
          backgroundColor: '#2d3748',
          boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(50, 50, 50, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.dark .neu-input': {
          backgroundColor: '#2d3748',
          boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.3), inset -3px -3px 6px rgba(50, 50, 50, 0.1)',
        },
        '.dark .neu-button': {
          backgroundColor: '#2d3748',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(50, 50, 50, 0.1)',
        },
        '.dark .neu-button:active': {
          boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(50, 50, 50, 0.1)',
        },
        '.dark .neu-tab-active': {
          backgroundColor: '#2d3748',
          boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(50, 50, 50, 0.1)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config