<template>
  <div class="app-container">
    <div class="sidebar-container" :style="{ width: isCollapse ? '64px' : '200px' }">
      <SidebarMenu ref="sidebarMenu" :isCollapse="isCollapse" />
    </div>

    <div class="main-container">
      <Navbar v-model:isCollapse="isCollapse" />
      <TabsView />

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

<script lang="ts" setup>
import { ref } from 'vue'
import SidebarMenu from './components/SidebarMenu.vue'
import Navbar from './components/Navbar.vue'
import TabsView from './components/TabsView.vue'

const isCollapse = ref<boolean>(false)
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
