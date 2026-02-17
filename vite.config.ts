// vite.config.ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Указываем базовый путь для GitHub Pages
  base: mode === 'production' ? '/netology_77_react-diploma-project/' : '/',
  plugins: [react()],
}))
