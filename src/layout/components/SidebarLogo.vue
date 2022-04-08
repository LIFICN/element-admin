<template>
  <router-link :class="['sidebar-logo-wrap', { 'sidebar-logo-wrap-collapse': isCollapse }]" to="/">
    <img v-if="logo" :src="logo" class="sidebar-logo" />

    <transition name="sidebarLogoTitleFade">
      <h1 v-if="!isCollapse" class="sidebar-logo-title">{{ title }}</h1>
    </transition>
  </router-link>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  isCollapse: {
    type: Boolean,
    required: true,
  },
})

const title = ref('Vue3 Admin')
const logo = ref('https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png')
</script>

<style lang="scss" scoped>
$sidebarBg: #304156;

.sidebarLogoTitleFade-enter-active {
  transition: opacity 1s;
}

.sidebarLogoTitleFade-enter-from,
.sidebarLogoTitleFade-leave-to {
  opacity: 0;
}

.sidebar-logo-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 50px;
  background-color: $sidebarBg;
  overflow: hidden;
  will-change: opacity;

  .sidebar-logo {
    width: 32px;
    height: 32px;
    margin: 0 10px;
  }

  .sidebar-logo-title {
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
  }
}

.sidebar-logo-wrap-collapse {
  justify-content: center;

  .sidebar-logo {
    margin: 0px;
  }
}
</style>
