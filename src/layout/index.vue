
<template>
  <div class="app-container">
    <div class="sidebar-container" :style="{ width: isCollapse ? '64px' : '200px' }">
      <sidebar-menu ref="sidebarMenu" :isCollapse="isCollapse"></sidebar-menu>
    </div>

    <el-scrollbar class="main-container">
      <nav-bar @menuCollapse="menuCollapse"></nav-bar>

      <div class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import sidebarMenu from './components/sidebar-menu.vue'
import navBar from './components/nav-bar.vue'

export default {
  components: {
    sidebarMenu,
    navBar,
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    menuCollapse(val) {
      this.isCollapse = val
    },
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .sidebar-container {
    transition: width 0.28s;
    will-change: transform;
  }

  .main-container {
    flex: 1;
    overflow: hidden;

    .app-main {
      padding: 20px;
    }
  }
}
</style>
