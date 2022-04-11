import { useUserStore } from '@/store/user'

export function importDirectives(app) {
  app.directive('permission', {
    mounted(el, binding) {
      const value = binding.value
      const store = useUserStore()
      const role = store.roleGetter
      if (Array.isArray(value) && !value.some((val) => role.includes(val))) el.remove()
    },
  })
}
