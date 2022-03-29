import { useUserStore } from '@/store/user'
import { App } from 'vue'

export function importDirectives(app: App<Element>): void {
    app.directive('role', {
        mounted(el: any, binding: any) {
            const value = binding.value
            const store = useUserStore()
            const role = store.roleGetter
            if (Array.isArray(value) && !value.includes(role)) el.remove()
        }
    })
}