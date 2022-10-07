import * as Icons from '@element-plus/icons-vue'
import { defineAsyncComponent } from 'vue'

export function useElementPlusIcons(app) {
  if (!app) return

  Object.keys(Icons).forEach((el) => {
    const asyncComponent = defineAsyncComponent(() => Promise.resolve(Icons[el]))
    app.component(`${el}Icon`, asyncComponent)
  })
}
