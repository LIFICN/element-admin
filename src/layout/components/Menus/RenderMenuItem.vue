<template>
  <MenuItem :item="item" v-if="!item.children || !item.children.length" />
  <Submenu :item="item" v-else-if="item.children && item.children.length">
    <RenderMenuItem v-for="it in item.children" :key="it.key" :item="it" />
  </Submenu>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'

const props = defineProps({
  item: {
    type: Object, //item数据对象
    default: function () {
      return {}
    },
  },
})
</script>

<style></style>
