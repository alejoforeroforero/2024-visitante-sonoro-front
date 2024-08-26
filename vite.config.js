import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:5174",
   },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

