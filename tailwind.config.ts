import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "height": "height",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'left-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500%)' },
        },
        'fade-in': {
          '0%': { transform: 'opacity(0)' },
          '100%': { transform: 'opacity(1)' },
        },
        'fade-out': {
          '0%': { transform: 'opacity(1)' },
          '100%': { transform: 'opacity(0)' },
        }
      },
      animation: {
        'left-right': 'left-right 2s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
