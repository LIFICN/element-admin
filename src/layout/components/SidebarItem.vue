<template>
  <el-menu-item :index="fullPath" v-if="!item.hidden && isSingleItem">
    <el-icon><component :is="options.icon" /></el-icon>
    <template #title>{{ options.title }}</template>
  </el-menu-item>

  <el-sub-menu :index="fullPath" v-else-if="!item.hidden && !isSingleItem">
    <template #title>
      <el-icon><component :is="options.icon" /></el-icon>
      <span>{{ options.title }}</span>
    </template>

    <!-- 递归菜单 -->
    <SidebarItem v-for="it in item.children" :key="it.path" :item="it" :basePath="fullPath" />
  </el-sub-menu>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object, //item数据对象
    default: function () {
      return {}
    },
  },
  basePath: {
    type: String, //上一层级路径
    default: '',
  },
})

const { item, basePath } = props

const options = computed(() => {
  //判断item层级
  if (!item.children || item.children.length > 1) return item.meta
  return item.children[0].meta
})

const fullPath = computed(() => {
  if (basePath) return `${basePath}/${item.path}`

  let isHaveChild = Array.isArray(item.children) && item.children.length == 1
  if (isHaveChild && item.children[0].path) return `${item.path}/${item.children[0].path}`

  return item.path
})

const isSingleItem = computed(() => {
  const children = item.children
  return !children || (Array.isArray(children) && children.length <= 1)
})
</script>

<style></style>
