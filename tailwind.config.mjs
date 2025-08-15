import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        w1600: { max: '1600px' },
        w1400: { max: '1400px' },
        w1200: { max: '1200px' },
        w1100: { max: '1100px' },
        w900: { max: '900px' },
        w800: { max: '800px' },
        w600: { max: '600px' },
        w500: { max: '500px' },
        w400: { max: '400px' },
      },
      colors: {
        lightModeText: '#374151', // deep gray, readable in light mode
        darkModeText: '#e5e7eb', // slightly grayish white, less eye-straining

        lightModeBg: colors.neutral[100],
        darkModeBg: colors.neutral[950],

        lightModeIcon: '#374151', // deep gray, consistent with other icons
        darkModeIcon: '#e5e7eb', // light gray, consistent with other icons

        lightModeBgHover: colors.neutral[300],
        darkModeBgHover: colors.neutral[700],
      },
      backgroundImage: {
        lightModeGradient:
          'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
        darkModeGradient:
          'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
      },
      borderRadius: {
        base: '10px', // do not set above 30px or some elements may look odd (e.g., search UI and results)
      },
      fontFamily: {
        sans: ['Noto Serif JP', 'Noto Serif', 'Noto Sans', 'sans-serif'],
        japanese: ['Noto Serif JP', 'Noto Serif', 'Noto Sans', 'sans-serif'],
      },
      fontWeight: {
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
    },
  },
  plugins: [typography],
  darkMode: 'class',
}
