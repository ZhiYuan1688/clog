import { vitePluginForArco } from '@arco-plugins/vite-vue';
import vue from "@vitejs/plugin-vue";
import path from 'path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from "vite";
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    vitePluginForArco({style: 'css'}),
    UnoCSS(),

  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.app/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
