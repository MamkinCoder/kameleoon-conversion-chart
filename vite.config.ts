import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: if your repo is NOT <username>.github.io,
  // set base to "/<repo-name>/"
  base: "/",
  build: {
    outDir: "docs",
  },
});
