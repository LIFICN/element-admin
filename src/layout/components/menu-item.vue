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
  computed: {
    options() {
      //判断当前menu-item层级
      if (!this.item.children || this.item.children.length > 1) return this.item.meta
      return this.item.children[0].meta
    },
    fullPath() {
      //递归拼接路径
      if (this.basePath) return this.basePath + '/' + this.item.path
      return this.item.path
    },
    isMenuItem() {
      const children = this.item.children
      return !children || (children.length <= 1 && this.item.path.startsWith('/'))
    },
  },
}
</script>

<style>
</style>