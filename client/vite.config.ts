import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const PickedKeys = [
  "FIRBASE_API_KEY",
  "FIRBASE_API_DOMAIN",
  "FIRBASE_API_PROJECT_ID",
  "FIRBASE_API_STORE_BUCKET",
  "FIRBASE_API_MESSAGING_SENDER_ID",
  "FIRBASE_API_APP_ID",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {} as any;
  PickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
    server: {
      origin: "http://localhost:5000",
      proxy: {
        "/api": {
          target: "http://localhost:5000",
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
