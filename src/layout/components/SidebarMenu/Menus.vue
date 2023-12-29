<template>
  <div class="app-menus">
    <MenuItem />
    <Submenu> </Submenu>
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
</script>

<style lang="scss" scoped>
.app-menus {
  background-color: #fff;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}
</style>
