import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  base: mode === 'production' ? '/bustracking/' : '/',

  server: {
    port: 5173,
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui';
            }

            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'vendor-maps';
            }

            if (id.includes('axios') || id.includes('react-router')) {
              return 'vendor-core';
            }

            return 'vendor';
          }
        },
      },
    },
  },

  chunkSizeWarningLimit: 1000,
  sourcemap: false,
  minify: 'esbuild',
  target: 'es2020',
}));