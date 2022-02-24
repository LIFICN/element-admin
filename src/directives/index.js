import store from '@/store'

export function importDirectives(app) {
    app.directive('role', {
        mounted(el, binding) {
            const value = binding.value
            const role = store.getters.role
            if (Array.isArray(value) && !value.includes(role)) el.remove()
        }
    })
}