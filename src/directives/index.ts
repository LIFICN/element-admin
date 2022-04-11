import { useUserStore } from '@/store/user'
import { App } from 'vue'

export function importDirectives(app: App<Element>): void {
  app.directive('permission', {
    mounted(el: any, binding: any) {
      const value = binding.value
      const store = useUserStore()
      const role = store.roleGetter
      if (Array.isArray(value) && !value.some(val => role.includes(val))) el.remove()
    },
  })
}
