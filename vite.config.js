import { defineConfig } from 'vite';

export default defineConfig({
  base: '/pizzavera/',
  server: {
    port: 3001,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist'
  }
});
