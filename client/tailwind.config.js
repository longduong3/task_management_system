/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4C3575',
        'secondary': '#F19828',
        'chart-color1': '#e05170'
      },
      background: {
        'primary': '#4C3575',
        'secondary': '#F19828',
        'chart-color1': '#e05170'
      },
      boxShadow: {
        custom: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      width: {
        'calc-100-minus-24': 'calc(100vw - 24rem)',
      },
      zIndex: {
        '9999': '9999',
      }
    },
  },
  plugins: [],
}