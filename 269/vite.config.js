import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/maktab-sayt/', // <--- MANA SHU QATORNI QO'SHASIZ
})