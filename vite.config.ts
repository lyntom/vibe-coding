import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Gunakan '/' saat development (npm run dev) agar http://localhost:5173/ langsung terbuka tanpa peringatan,
  // dan '/e-tamu/' saat build produksi untuk GitHub Pages (https://lyntom.github.io/e-tamu/)
  base: command === 'serve' ? '/' : '/e-tamu/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
