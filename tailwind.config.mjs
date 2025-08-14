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
        lightModeText: '#000',
        darkModeText: '#fff',

        lightModeBg: colors.neutral[100],
        darkModeBg: colors.neutral[950],

        lightModeIcon: '#000',
        darkModeIcon: '#fff',

        lightModeBgHover: colors.neutral[300],
        darkModeBgHover: colors.neutral[700],
      },
      backgroundImage: {
        lightModeGradient:
          'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)',
        darkModeGradient:
          'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
      },
      borderRadius: {
        base: '10px', // dont make this value greater than 30px because it can make some elements look weird e.g. search element and search results
      },
      fontFamily: {
        sans: ['Karla', 'Shippori Mincho B1', 'Hiragino Mincho ProN', 'Yu Mincho', 'Meiryo', 'serif'],
        japanese: ['Shippori Mincho B1', 'Hiragino Mincho ProN', 'Yu Mincho', 'Meiryo', 'serif'],
      },
    },
  },
  plugins: [typography],
  darkMode: 'class',
}
