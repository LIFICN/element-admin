import { createApp } from 'vue'
import App from './App.vue'

//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//vue router
import router from './router'
import './router/permission'

//vue store
import store from './store'

// glob
import { globComponents } from './utils/glob'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(store)
globComponents(app)
app.mount('#app')
