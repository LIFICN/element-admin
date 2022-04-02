import { useUserStore } from '@/store/user'

export function importDirectives(app) {
  app.directive('role', {
    mounted(el, binding) {
      const value = binding.value
      const store = useUserStore()
      const role = store.roleGetter
      if (Array.isArray(value) && !value.includes(role)) el.remove()
    },
  })
}
