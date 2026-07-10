import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    allowedHosts: ["grace.andreiam.uk", "localhost", ".trycloudflare.com"],
    host: "0.0.0.0",
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
});
