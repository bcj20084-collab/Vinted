import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#172126", mint: "#007782", cream: "#f7f7f2" } } },
  plugins: []
} satisfies Config;
