// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/bustracking/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    // no rollupOptions.output.manualChunks — let Rolldown decide
  },
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
}));