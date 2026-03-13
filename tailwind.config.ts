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
          // Toastmasters Brand Manual colors
          blue: '#004165', // Loyal Blue
          maroon: '#772432', // True Maroon
          gray: '#A9B2B1', // Cool Gray
          yellow: '#F2DF74', // Happy Yellow (accent)
          cream: '#F5F5F5',
          charcoal: '#2C2C2C',
        },
      },
      fontFamily: {
        // Brand Manual recommends Montserrat + Source Sans 3 as free alternates
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', '"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
