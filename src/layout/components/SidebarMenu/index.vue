<template>
  <div class="sidebar-container" :style="{ width }">
    <Logo :collapse="collapse" />
    <Menus />
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import Menus from './Menus.vue'

defineProps({
  collapse: {
    type: Boolean,
    default: false,
    required: true,
  },
  width: {
    type: String,
    default: '200px',
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  box-sizing: border-box;
  will-change: width;
  transition: width 0.26s ease;
}
</style>
