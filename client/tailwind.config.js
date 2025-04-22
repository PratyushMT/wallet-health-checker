/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        solana: {
          purple: "#9945FF",
          green: "#14F195",
          blue: "#00C2FF"
        },
        dark: {
          bg: "#0F0F1A",
          card: "#1A1A2E",
          border: "#2A2A4A",
          text: {
            primary: "#FFFFFF",
            secondary: "#B4B4D9",
            muted: "#6B7280"
          }
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6"
        }
      },
      boxShadow: {
        glow: "0 0 15px rgba(153, 69, 255, 0.5)",
        "glow-sm": "0 0 10px rgba(153, 69, 255, 0.3)"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at 50% 0%, rgba(153, 69, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
        "gradient-text": "linear-gradient(90deg, #9945ff, #14f195)"
      },
      animation: {
        "pulse-slow": "pulse 3s infinite"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      screens: {
        'xs': '360px',   // Extra small devices
        'sm': '640px',   // Small devices
        'md': '768px',   // Medium devices
        'lg': '1024px',  // Large devices
        'xl': '1280px',  // Extra large devices
        '2xl': '1536px', // 2X Extra large devices
      }
    }
  },
  plugins: []
}
