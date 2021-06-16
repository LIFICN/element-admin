import { defineAsyncComponent } from 'vue'
const modules = import.meta.glob('/src/components/*.vue')
const components = []

for (const path in modules) {
    const index = path.lastIndexOf('/')
    const name = path.slice(index + 1).replace('.vue', '')
    components.push({ key: name, value: defineAsyncComponent(modules[path]) })
}

export default components