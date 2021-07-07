
<template>
  <div class="app-container">
    <div class="sidebar-container" :style="{ width: isCollapse ? '64px' : '200px' }">
      <sidebar-menu ref="sidebarMenu" :isCollapse="isCollapse"></sidebar-menu>
    </div>

    <div class="main-container">
      <nav-bar v-model:isCollapse="isCollapse"></nav-bar>
      <tabs-view></tabs-view>

      <el-scrollbar class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import sidebarMenu from './components/sidebar-menu.vue'
import navBar from './components/nav-bar.vue'
import tabsView from './components/tabs-view.vue'

export default {
  components: {
    sidebarMenu,
    navBar,
    tabsView,
  },
  setup() {
    const isCollapse = ref(false)
    return { isCollapse }
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
    will-change: width;
  }

  .main-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .app-main {
      padding: 20px;
      flex: 1;
    }
  }
}
</style>
