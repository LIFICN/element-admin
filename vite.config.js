import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://cn.vitejs.dev/
export default defineConfig({
  plugins: [Vue()],
  server: {
    open: true, //是否打开浏览器
    port: 3000, //端口号
    cors: true, //跨域
    host: '0.0.0.0', //ip地址
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 转换 '@' to 'src'
    },
  },
})
