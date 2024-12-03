import { fileURLToPath, URL } from "node:url";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssPxToRem from "postcss-pxtorem";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    hmr: true,
    proxy: {
      "/api": {
        target: "http://121.36.95.15:6699",
        // 配置代理服务器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 引入less
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/assets/css/base.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 16,
          propList: ["*"],
        }),
      ],
    },
  },
  build: {},
});
