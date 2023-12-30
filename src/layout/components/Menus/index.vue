<template>
  <div class="app-menus">
    <!-- 递归菜单 -->
    <RenderMenuItem v-for="(item, index) in list" :key="'rendermenuitem' + index" :item="item" />
  </div>
</template>

<script setup>
import RenderMenuItem from './RenderMenuItem.vue'
import { provide, computed, ref, readonly, watch } from 'vue'

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
})

const activeKey = ref('')
const treeParentMap = {}

provide('scopeObj', {
  collapse: computed(() => props.collapse),
  activeKey: readonly(activeKey),
  setActiveKey: setActiveKey,
  getTreeParentMap: () => treeParentMap,
})

function setActiveKey(val) {
  activeKey.value = val || ''
}

watch(
  () => props.list,
  () => {
    forEachTree(props.list)
    console.log(treeParentMap)
  },
  { deep: true, immediate: true }
)

function forEachTree(arr, parent = []) {
  if (!arr || arr.length == 0) return

  arr.forEach((el, index) => {
    if (el.children && el.children.length > 0) {
      parent = parent.concat(el)
    } else {
      treeParentMap[el.key] = parent
      if (index == arr.length - 1) parent = []
    }

    forEachTree(el.children, parent)
  })
}
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
