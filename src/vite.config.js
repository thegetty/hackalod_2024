import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import { createVuePlugin } from "vite-plugin-vue2";
import handlebars from "vite-plugin-handlebars";
import rawPlugin from "vite-raw-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    manifest: true,
    minify: "terser",
    polyfillModulePreload: true,
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: ["es2015"],
  },
  server: {
    port: 8000,
    hmr: {
      port: 8000,
      host: "localhost",

      // External port (Docker host)
      clientPort: 8000,
      path: "/sockjs-node/",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // preload these in every page
        additionalData: `
              @import "@/styles/index.scss";
            `,
      },
    },
  },
  fs: {
    strict: true,
    // Allow serving files from one level up to the project root
    allow: ["/src/"],
  },
  plugins: [
    rawPlugin({
      fileRegex: /\.md$/,
    }),
    createVuePlugin(),
    eslintPlugin(),
    handlebars({
      partialDirectory: path.resolve(
        __dirname,
        "./node_modules/@thegetty/getty-ui/dist/partials/"
      ),
    }),
  ],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
