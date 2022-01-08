<template>
  <el-menu-item :index="fullPath" v-if="!item.hidden && isMenuItem">
    <el-icon><component :is="Icons[options.icon]" /></el-icon>
    <template #title>{{ options.title }}</template>
  </el-menu-item>

  <el-sub-menu :index="fullPath" v-else-if="!item.hidden && !isMenuItem">
    <template #title>
      <el-icon><component :is="Icons[options.icon]" /></el-icon>
      <span>{{ options.title }}</span>
    </template>

    <!-- 递归菜单 -->
    <MenuItem v-for="it in item.children" :key="it.path" :item="it" :basePath="fullPath" />
  </el-sub-menu>
</template>

<script setup>
import { computed } from 'vue'
import * as Icons from '@element-plus/icons-vue'

const props = defineProps({
  item: {
    type: Object, //meun-item数据对象
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
  //判断当前menu-item层级
  if (!item.children || item.children.length > 1) return item.meta
  return item.children[0].meta
})

const fullPath = computed(() => {
  //递归拼接路径
  if (basePath) return basePath + '/' + item.path
  return item.path
})

const isMenuItem = computed(() => {
  const children = item.children
  return !children || (children.length <= 1 && item.path.startsWith('/'))
})
</script>

<style>
</style>