import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // for Electron builds
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, // optional to silence warnings
  },
})
