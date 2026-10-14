import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev: UI on http://localhost:5173, API proxied to the local backend on 4000.
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173, proxy: { '/api': { target: 'http://127.0.0.1:4000', changeOrigin: false } } },
  build: { outDir: 'dist', sourcemap: false },
});
