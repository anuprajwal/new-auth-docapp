import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000,
    strictPort: true // Prevents Vite from automatically trying 7001 if 7000 is busy
  }
})