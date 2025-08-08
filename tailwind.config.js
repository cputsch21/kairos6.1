/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kairos color palette
        primary: {
          50: '#f8f7ff',
          100: '#f0eeff',
          200: '#e6e3ff',
          300: '#d4d0ff',
          400: '#b6b1e1', // App primary color
          500: '#9a94d4',
          600: '#7d76c7',
          700: '#6159ba',
          800: '#4a42a8',
          900: '#3a3287',
        },
        // Light mode colors
        light: {
          bg: '#ffffff',
          surface: '#fafafa',
          text: '#1a1a1a',
          textSecondary: '#6b7280',
          border: '#e5e7eb',
        },
        // Dark mode colors
        dark: {
          bg: '#0f0f0f',
          surface: '#1a1a1a',
          text: '#fafafa',
          textSecondary: '#9ca3af',
          border: '#374151',
        },
        // Arc mode colors (placeholder)
        arc: {
          bg: '#fafafa',
          surface: '#ffffff',
          text: '#1a1a1a',
          textSecondary: '#6b7280',
          border: '#e5e7eb',
        },
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        raleway: ['Raleway', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-out': 'fadeOut 0.4s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'carousel-dot': 'carouselDot 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        carouselDot: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
