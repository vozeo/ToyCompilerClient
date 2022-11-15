import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/file': {
        target: "http://127.0.0.1:40800/file",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/file/, '')
      }
    }
  }
})
