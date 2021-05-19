
<template>
  <div class="app-container">
    <div class="sidebar-container">
      <sidebar-menu ref="sidebarMenu"></sidebar-menu>
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
    return {}
  },
  methods: {
    menuCollapse(val) {
      //是否折叠菜单
      this.$nextTick(() => {
        this.$refs['sidebarMenu'].isCollapse = val
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  .sidebar-container {
    //重置element菜单动画
    .horizontal-collapse-transition {
      transition: width 0.28s;
      will-change: transform;
    }
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
