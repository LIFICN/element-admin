import { ref, computed } from 'vue'

export function useCollapse() {
  const isCollapse = ref(false)
  const sidebarWidth = computed(() => (isCollapse.value ? '72px' : '240px'))

  function setCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return [isCollapse, sidebarWidth, setCollapse]
}
