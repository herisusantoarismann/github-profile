import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.PERSONAL_TOKEN": JSON.stringify(env.PERSONAL_TOKEN),
      "process.env.HOTJAR_ID": JSON.stringify(env.HOTJAR_ID),
      "process.env.GA_TRACKING_ID": JSON.stringify(env.GA_TRACKING_ID),
    },
    plugins: [react()],
  };
});
