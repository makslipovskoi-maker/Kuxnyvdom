import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Для обычного домена используется /. Для GitHub Pages workflow передаёт /Kuxnyvdom/.
  base: process.env.VITE_BASE_PATH || '/',
});
