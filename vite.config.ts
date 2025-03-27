import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      pages: "/src/pages",
      hooks: "/src/hooks",
      types: "/src/types",
      api: "/src/api.ts",
      const: "/src/const.ts",
      store: "/src/store",
    },
  },
});
