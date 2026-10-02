/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Sora", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        darkBg: "#0B1120",
        darkCard: "rgba(15, 23, 42, 0.65)",
        darkBorder: "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
          light: "rgba(99, 102, 241, 0.15)",
        },
        accent: {
          DEFAULT: "#06B6D4",
          hover: "#0891B2",
          light: "rgba(6, 182, 212, 0.15)",
        },
        purpleAccent: {
          DEFAULT: "#8B5CF6",
          hover: "#7C3AED",
          light: "rgba(139, 92, 246, 0.15)",
        },
        textMain: "#F8FAFC",
        textMuted: "#94A3B8",
        // Light mode fallbacks
        lightBg: "#F8FAFC",
        lightCard: "rgba(255, 255, 255, 0.8)",
        lightBorder: "rgba(0, 0, 0, 0.08)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glowPrimary: "0 0 25px -5px rgba(99, 102, 241, 0.5)",
        glowAccent: "0 0 25px -5px rgba(6, 182, 212, 0.5)",
        glowPurple: "0 0 25px -5px rgba(139, 92, 246, 0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.05)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 8s ease-in-out infinite",
        gradientShift: "gradientShift 8s ease infinite",
        textShimmer: "textShimmer 5s linear infinite",
      },

    },
  },
  plugins: [],
};

