import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '192.168.1.61', // Địa chỉ IP của bạn
  // }
})
