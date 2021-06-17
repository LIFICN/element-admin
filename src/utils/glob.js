import { defineAsyncComponent } from 'vue'

export function globComponents(app) {
    const modules = import.meta.glob('/src/components/*.vue')
    const components = []

    for (const path in modules) {
        const index = path.lastIndexOf('/')
        const name = path.slice(index + 1).replace('.vue', '')
        components.push({ key: name, value: defineAsyncComponent(modules[path]) })
    }

    components.forEach(el => app.component(el.key, el.value))
}