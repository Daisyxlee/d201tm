import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tm: {
          maroon: '#8B1538',
          navy: '#003366',
          gold: '#C5A572',
          cream: '#F5F0E6',
          charcoal: '#2C2C2C',
        },
      },
      fontFamily: {
        sans: ['var(--font-gothic)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
