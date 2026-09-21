import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Bu yerda faqat / turishi shart, maktab-sayt bo'lmasligi kerak!
})