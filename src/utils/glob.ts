import { App, AsyncComponentLoader, defineAsyncComponent } from 'vue'

export function globComponents(app: App<Element>): void {
  const modulesRoot = import.meta.glob('/src/components/*.vue')
  const modulesSon = import.meta.glob('/src/components/**/index.vue')

  const components = []

  for (const path in modulesRoot) {
    const index = path.lastIndexOf('/')
    const name = path.slice(index + 1).replace('.vue', '')
    components.push({ key: name, value: defineAsyncComponent(modulesRoot[path] as AsyncComponentLoader) })
  }

  for (const path in modulesSon) {
    const replacePath = path.replace('/index.vue', '')
    const index = replacePath.lastIndexOf('/')
    const name = replacePath.slice(index + 1)
    components.push({ key: name, value: defineAsyncComponent(modulesSon[path] as AsyncComponentLoader) })
  }

  components.forEach((el) => app.component(el.key, el.value))
}
