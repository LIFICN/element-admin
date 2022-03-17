import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const path = require('path')

// https://cn.vitejs.dev/
export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
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
