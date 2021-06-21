<template>
  <el-menu-item :index="fullPath" v-if="!item.hidden && isMenuItem">
    <i :class="options.icon"></i>
    <template #title>{{ options.title }}</template>
  </el-menu-item>

  <el-submenu :index="fullPath" v-else-if="!item.hidden && !isMenuItem">
    <template #title>
      <i :class="options.icon"></i>
      <span>{{ options.title }}</span>
    </template>

    <!-- 递归菜单 -->
    <menu-item v-for="it in item.children" :key="it.path" :item="it" :basePath="fullPath"></menu-item>
  </el-submenu>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'

export default {
  props: {
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
  },
  setup(props) {
    const { item, basePath } = props

    const state = reactive({
      options: computed(() => {
        //判断当前menu-item层级
        if (!item.children || item.children.length > 1) return item.meta
        return item.children[0].meta
      }),
      fullPath: computed(() => {
        //递归拼接路径
        if (basePath) return basePath + '/' + item.path
        return item.path
      }),
      isMenuItem: computed(() => {
        const children = item.children
        return !children || (children.length <= 1 && item.path.startsWith('/'))
      }),
    })

    return { ...toRefs(state) }
  },
}
</script>

<style>
</style>