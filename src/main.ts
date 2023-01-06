import { createApp } from 'vue'
import App from './App.vue'

//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//nprogress
import 'nprogress/nprogress.css'

//pinia
import { createPinia } from 'pinia'

//vue router
import router from './router'
import './router/permission'

// glob 遍历导入组件
// import { globComponents } from './utils/glob'
// globComponents(app)

// directive
import { importDirectives } from './directives'

//element-plus utils
import { useElementPlusIcons } from '@/utils/element-plus'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, { locale: zhCn, size: 'small' })
importDirectives(app)
useElementPlusIcons(app)
app.mount('#app')
