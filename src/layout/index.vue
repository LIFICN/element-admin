
<template>
  <div class="app-container">
    <div class="sidebar-container" :style="{ width: isCollapse ? '64px' : '200px' }">
      <sidebar-menu ref="sidebarMenu" :isCollapse="isCollapse"></sidebar-menu>
    </div>

    <div class="main-container">
      <nav-bar @menuCollapse="menuCollapse"></nav-bar>
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
import { reactive, toRefs } from 'vue'
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
    const state = reactive({
      isCollapse: false,
      menuCollapse(val) {
        state.isCollapse = val
      },
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &:hover > .sidebar-container {
    will-change: width;
  }

  .sidebar-container {
    transition: width 0.28s;
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
