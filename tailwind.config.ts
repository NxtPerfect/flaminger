import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'left-right': {
          '0%': { transform: 'scale(100%) translateX(-100%)' },
          '50%': { transform: 'scale(400%) translateX(165%)' },
          '100%': { transform: 'scale(100%) translateX(1500%)' },
        }
      },
      animation: {
        'left-right': 'left-right 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
