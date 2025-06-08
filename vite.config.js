import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // Proxy all requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:3000',  // change to your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // optional: removes /api prefix when forwarding
      }
    }
  }
})
