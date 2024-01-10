import { defineAsyncComponent } from 'vue'

export function globComponents(app) {
  const modulesRoot = { ...import.meta.glob('/src/components/*.vue'), ...import.meta.glob('/src/components/*.jsx') }

  const modulesSon = {
    ...import.meta.glob('/src/components/**/index.vue'),
    ...import.meta.glob('/src/components/**/index.jsx'),
  }

  const components = []

  for (const path in modulesRoot) {
    const index = path.lastIndexOf('/')

    const name = path
      .slice(index + 1)
      .replace('.vue', '')
      .replace('.jsx', '')

    components.push({ key: name, value: defineAsyncComponent(modulesRoot[path]) })
  }

  for (const path in modulesSon) {
    const replacePath = path.replace('/index.vue', '').replace('/index.jsx', '')
    const index = replacePath.lastIndexOf('/')
    const name = replacePath.slice(index + 1)
    components.push({ key: name, value: defineAsyncComponent(modulesSon[path]) })
  }

  components.forEach((el) => app.component(el.key, el.value))
}
