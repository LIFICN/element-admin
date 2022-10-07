import * as Icons from '@element-plus/icons-vue'
import { App, defineAsyncComponent } from 'vue'

export function useElementPlusIcons(app:App<Element>) {
  if (!app) return

  Object.keys(Icons).forEach((el) => {
    const asyncComponent = defineAsyncComponent(() => Promise.resolve((Icons as any)[el]))
    app.component(`${el}Icon`, asyncComponent)
  })
}
