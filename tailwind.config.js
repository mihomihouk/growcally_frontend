/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-300': '#fed7aa',
        'primary-400': '#fb923c',
        'primary-500': '#f97316',
        'secondary-300': '#006855',
        'secondary-400': '#2c70b7',
        'secondary-500': '#16a0f9',
        'gray-300': '#d1d5db',
        'gray-400': '#9ca3af',
        'gray-500': '#6b7280',
        'gray-600': '#4b5563',
        'gray-700': '#374151',
        'gray-800': '#1f2937',
        'success-500': '#22c55e',
        'error-500': '#ef4444'
      }
    }
  },
  plugins: []
};
