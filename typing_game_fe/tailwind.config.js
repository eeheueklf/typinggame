/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}", // 추가된 폴더가 있다면 꼭 넣어주세요
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['NanumHumanBold', 'Helvetica', 'sans-serif'],
        mont: ['Montserrat','Helvetica', 'sans-serif'],
        liber: ['Libertinus','Helvetica', 'sans-serif'],
      },
      fontSize: {
        header: 'var(--tpg-header-font-size)',
      },
      colors: {
        'key-blue': '#3b82f6',
        'key-red': '#ef4444',
      },
      keyframes: {
        fadeIn: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0px)', opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.1s ease-out',
      }
    },
  },
  plugins: [],
};