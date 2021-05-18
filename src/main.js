import { createApp } from 'vue'
import App from './App.vue'
//element plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
//vue router
import router from './router'
//vue store
import store from './store'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
