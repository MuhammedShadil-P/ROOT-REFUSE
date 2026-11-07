/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060606',
          900: '#0B0B0B',
          850: '#111111',
          800: '#161616',
          700: '#222222',
          600: '#2E2E2E',
        },
        canvas: {
          DEFAULT: '#F4F4F0',
          50: '#FAF9F6',
          100: '#F4F4F0',
          200: '#E9E9E2',
          300: '#DCDCD3',
        },
        lime: {
          DEFAULT: '#CCFF00',
          bright: '#D4FF00',
          hover: '#B5E600',
          dark: '#93B800',
          dim: '#243003',
          light: '#F4FFD4',
        },
        cobalt: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          electric: '#0047FF',
          dim: '#0D2152',
          light: '#EFF6FF',
        },
      },
      fontFamily: {
        display: ['Syne', 'Archivo Black', 'Inter', 'sans-serif'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tightest: '-0.07em',
        widest: '0.2em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        marqueeFast: 'marquee 12s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        scan: 'scanline 2.2s ease-in-out infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #0B0B0B',
        'brutal-lime': '4px 4px 0px 0px #CCFF00',
        'brutal-blue': '4px 4px 0px 0px #2563EB',
        'brutal-sm': '2px 2px 0px 0px #0B0B0B',
        'glow-lime': '0 0 25px -4px rgba(204, 255, 0, 0.45)',
        'glow-blue': '0 0 25px -4px rgba(37, 99, 235, 0.45)',
      }
    },
  },
  plugins: [],
}
