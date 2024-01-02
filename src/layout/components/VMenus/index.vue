<template>
  <div class="app-menus">
    <!-- 递归菜单 -->
    <RenderMenuItem v-for="(item, index) in list" :key="'rendermenuitem' + index" :item="item" />
  </div>
</template>

<script setup>
import RenderMenuItem from './RenderMenuItem.vue'
import { provide, computed, ref, readonly, watch, useSlots } from 'vue'
const rootSlots = useSlots()

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
    required: true,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  activeKey: {
    typed: String,
    default: '',
  },
})

const activeKey = ref('')
const treeParentMap = {}

provide('scopeObj', {
  collapse: computed(() => props.collapse),
  activeKey: readonly(activeKey),
  getTreeParentMap: () => treeParentMap,
  setActiveKey: setActiveKey,
  slots: rootSlots,
})

function setActiveKey(val) {
  activeKey.value = val || ''
}

function forEachTree(arr, parentKey = '') {
  if (!arr || !arr.length) return

  arr.forEach((el) => {
    el.children &&
      el.children.forEach((x) => {
        treeParentMap[x.key] = [el]
      })

    if (parentKey) {
      treeParentMap[el.key] = [...(treeParentMap[parentKey] || []), ...(treeParentMap[el.key] || [])]
    }

    forEachTree(el.children, el.key)
  })
}

watch(
  () => props.list,
  () => {
    forEachTree(props.list)
    console.log('treeParentMap', treeParentMap)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.activeKey,
  (newVal) => setActiveKey(newVal),
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-menus {
  background-color: #fff;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>
