import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'

//element plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

//vue router
import router from './router'
import './router/permission'

// glob 遍历导入组件
import { globComponents } from './utils/glob'

//nprogress
import 'nprogress/nprogress.css'

//pinia
import { createPinia } from 'pinia'

//element-plus icons
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, { locale: zhCn, size: 'small' })
globComponents(app)
app.mount('#app')

//import element-plus icons
Object.keys(Icons).forEach((el) => {
  const asyncComponent = defineAsyncComponent(() => Promise.resolve(Icons[el]))
  app.component(`${el}Icon`, asyncComponent)
})
