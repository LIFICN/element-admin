import { createApp } from 'vue'
import App from './App.vue'
//element plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
//vue router
import router from './router'
import './router/permission'
//vue store
import store from './store'
// glob
import globComponents from './utils/glob'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
globComponents.forEach(el => app.component(el.key, el.value))
app.mount('#app')
