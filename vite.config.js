// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/service-provider': {
        target: "https://pjsofttech.in:9090",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Keep the path as is
      }
    }
  }
})