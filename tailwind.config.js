/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-300': '#fed7aa',
        'primary-400': '#fb923c',
        'primary-500': '#f97316',
        'primary-600': '#ea580c',
        'primary-700': '#c2410c',
        'primary-800': '#9a3412',
        'secondary-300': '#93c5fd',
        'secondary-400': '#60a5fa',
        'secondary-500': '#3b82f6',
        'secondary-600': '#2563eb',
        'secondary-700': '#1d4ed8',
        'secondary-800': '#1e40af',
        'gray-300': '#d1d5db',
        'gray-400': '#9ca3af',
        'gray-500': '#6b7280',
        'gray-600': '#4b5563',
        'gray-700': '#374151',
        'gray-800': '#1f2937',
        'success-500': '#22c55e',
        'error-500': '#ef4444',
        'error-600': '#dc2626',
        'error-700': '#b91c1c',
        'error-800': '#991b1b'
      }
    }
  },
  plugins: []
};
