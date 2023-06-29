import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  build: {
    rollupOptions: {
      external: /^react/,
    },
  },
  jsconfig: {
    configFile: path.resolve(__dirname, "jsconfig.json"),
  },
});
