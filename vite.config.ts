import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/kameleoon-conversion-chart/",
  build: {
    outDir: "docs",
  },
});
