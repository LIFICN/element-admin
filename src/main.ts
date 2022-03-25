import { createApp } from 'vue'
import App from './App.vue'

//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//nprogress
import 'nprogress/nprogress.css'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
