import { createApp } from 'vue'
import App from './App.vue'

//element plus
import 'element-plus/dist/index.css'

//vue router
import router from './router'
import './router/permission'

// glob
import { globComponents } from './utils/glob'

// directive
import { importDirectives } from './directives'

//nprogress
import 'nprogress/nprogress.css'

//pinia
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
globComponents(app)
importDirectives(app)
app.mount('#app')
