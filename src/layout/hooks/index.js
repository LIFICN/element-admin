import { ref, computed } from 'vue'

export function useCollapse() {
  const isCollapse = ref(false)
  const sidebarWidth = computed(() => (isCollapse.value ? '64px' : '200px'))

  function setCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return [isCollapse, sidebarWidth, setCollapse]
}
