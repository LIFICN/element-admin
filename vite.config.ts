import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'

// https://cn.vitejs.dev/
export default defineConfig({
  plugins: [
    Vue(),
  ],
  server: {
    open: true,  //是否打开浏览器
    port: 3000,  //端口号
    cors: true   //跨域
  },
  base: '/',  //根路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src") // 转换 '@' to './src' 
    }
  }
})
