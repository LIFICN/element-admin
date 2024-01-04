import { ref, watch, inject } from 'vue'

export function useProvideMenusKey() {
  return 'scopeMeunsObj'
}

export function useInjectMeunsKey() {
  return inject(useProvideMenusKey())
}

export function useTreeToParentMap(treeList) {
  const treeParentMap = ref({})

  watch(
    () => treeList,
    () => {
      treeParentMap.value = forEachTreeToMap(treeList)
      console.log('treeParentMap', treeParentMap)
    },
    { deep: true, immediate: true }
  )

  function forEachTreeToMap(arr, parentKey = '', parentMap = {}) {
    if (!arr || !arr.length) return

    arr.forEach((el) => {
      el.children &&
        el.children.forEach((x) => {
          parentMap[x.key] = [el]
        })

      if (parentKey) {
        parentMap[el.key] = [...(parentMap[parentKey] || []), ...(parentMap[el.key] || [])]
      }

      forEachTreeToMap(el.children, el.key, parentMap)
    })

    return parentMap
  }

  return [treeParentMap]
}
