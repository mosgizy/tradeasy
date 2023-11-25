import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FF6641',
          200:'#2B3F6C'
          
        },
        secondary: {
          100: '#C7C7C7',
          200: '#3DB107;',
          300: '#D9D9D9',
          400: '#F7F4EF',
          500: '#EFF3FA',
          600: '#D6DAE3',
          700:'#F9FAFE'
        }
      },
      fontSize: {
        '4.5xl':' 2.84581rem',
      },
      boxShadow: {
        100: '0px 4px 12px 0px rgba(0, 0, 0, 0.08)',
        200: '0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
        300:'-16px 4px 100px 0px rgba(0, 0, 0, 0.04)'
      }
      
    },
  },
  plugins: [],
}
export default config
