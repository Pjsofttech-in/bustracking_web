
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/bus': { target: 'https://pjsofttech.com', changeOrigin: true },
      '/service-providers': { target: 'https://pjsofttech', changeOrigin: true },
      '/drivers': { target: 'https://pjsofttech.com', changeOrigin: true },
      '/conductors': { target: 'https://pjsofttech.com', changeOrigin: true },
      '/bus-stops': { target: 'https://pjsofttech.com', changeOrigin: true },
      '/bus-routes': { target: 'https://pjsofttech.com', changeOrigin: true },
      '/bus-locations': { target: 'https://pjsofttech.com', changeOrigin: true },
      '/academic-years': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/classes': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/mediums': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/divisions': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/students': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/student-fees': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/student-scans': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/bus-trips': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },
      '/dashboard': { target: 'https://pjsofttech.com', changeOrigin: true, secure: false },

    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui') || id.includes('@emotion')) return 'vendor-mui';
            if (id.includes('leaflet') || id.includes('react-leaflet')) return 'vendor-maps';
            if (id.includes('axios') || id.includes('react-router')) return 'vendor-core';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
});