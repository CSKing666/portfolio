import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

// The site is published to GitHub Pages under /portfolio, so every asset URL
// needs that prefix. In dev the base is applied too, matching production.
export default defineConfig({
  base: '/portfolio/',
  plugins: [UnoCSS(), react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
  },
})
