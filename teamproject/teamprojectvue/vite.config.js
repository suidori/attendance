import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',  // 모든 외부 IP에서 접속 가능하도록 설정
    port: 5173,        // 원하는 포트로 설정 (기본값 3000)
    strictPort: true,  // 포트 충돌 방지
    hmr: {
      host: 'localhost', // Hot Module Replacement(HMR) 설정
    },
  },
})
