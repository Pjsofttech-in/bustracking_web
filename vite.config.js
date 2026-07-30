import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/bustracking/',
  server: {
    port: 5173,
    proxy: {
      // Local backend for development
      '/bus': { target: 'http://localhost:8080', changeOrigin: true },
      '/service-providers': { target: 'http://localhost:8080', changeOrigin: true },
      '/drivers': { target: 'http://localhost:8080', changeOrigin: true },
      '/conductors': { target: 'http://localhost:8080', changeOrigin: true },
      '/bus-stops': { target: 'http://localhost:8080', changeOrigin: true },
      '/bus-routes': { target: 'http://localhost:8080', changeOrigin: true },
      '/bus-locations': { target: 'http://localhost:8080', changeOrigin: true },
      '/academic-years': { target: 'http://localhost:8080', changeOrigin: true },
      '/classes': { target: 'http://localhost:8080', changeOrigin: true },
      '/mediums': { target: 'http://localhost:8080', changeOrigin: true },
      '/divisions': { target: 'http://localhost:8080', changeOrigin: true },
      '/students': { target: 'http://localhost:8080', changeOrigin: true },
      '/student-fees': { target: 'http://localhost:8080', changeOrigin: true },
      '/student-scans': { target: 'http://localhost:8080', changeOrigin: true },
      '/bus-trips': { target: 'http://localhost:8080', changeOrigin: true },
      '/dashboard': { target: 'http://localhost:8080', changeOrigin: true },
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
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
  },
});