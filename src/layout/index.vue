<template>
  <div class="app-container">
    <div class="sidebar-container" :style="{ width: sidebarWidth }">
      <SidebarLogo :isCollapse="isCollapse" />
      <SidebarMenu ref="sidebarMenu" :isCollapse="isCollapse" />
    </div>

    <div class="main-container" :style="{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }">
      <Navbar v-model:isCollapse="isCollapse" />
      <TabsView />

      <el-scrollbar class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import SidebarMenu from './components/SidebarMenu.vue'
import Navbar from './components/Navbar.vue'
import TabsView from './components/TabsView.vue'
import SidebarLogo from './components/SidebarLogo.vue'

const isCollapse = ref<boolean>(false)
const sidebarWidth = computed<string>(() => (isCollapse.value ? '64px' : '200px'))
</script>

<style lang="scss" scoped>
.app-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  .sidebar-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    box-sizing: border-box;
    will-change: width;
    transition: width 0.26s ease;
  }

  .main-container {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    will-change: left;
    transition: left 0.26s ease;
    height: 100%;

    .app-main {
      padding: 13px 13px 0 13px;
      flex: 1;
    }
  }
}
</style>
