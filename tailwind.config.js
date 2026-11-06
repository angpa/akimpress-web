/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        feast: {
          yellow: '#FFE500',
          yellowLight: '#FFF58A',
          blue: '#005BFF',
          blueDark: '#003ECC',
          cyan: '#00F0FF',
          pink: '#FF007A',
          pinkLight: '#FF54A8',
          lime: '#CCFF00',
          orange: '#FF5500',
          purple: '#8000FF',
          dark: '#0A0A0A',
          cream: '#FFFDEB',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#005BFF',
          600: '#0047D4',
          700: '#003ECC',
          800: '#1e40af',
          900: '#0f172a',
        },
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-md': '6px 6px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-xl': '12px 12px 0px 0px #000000',
        'brutal-white': '4px 4px 0px 0px #FFFFFF',
        'brutal-white-lg': '8px 8px 0px 0px #FFFFFF',
        'brutal-yellow': '4px 4px 0px 0px #FFE500',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        display: ['Outfit', 'Impact', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'marquee-fast': 'marquee 12s linear infinite',
        'marquee-reverse': 'marquee-reverse 22s linear infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
