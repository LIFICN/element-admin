<template>
  <div class="app-container">
    <div class="sidebarmenu-wrap" :style="{ width: sidebarWidth }">
      <Sidebar :collapse="collapse" @collapse-change="setCollapse" width="auto" />
    </div>

    <div class="main-container" :style="{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }">
      <Navbar />
      <TabsView />
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import TabsView from './components/TabsView/index.vue'
import AppMain from './components/AppMain/index.vue'
import { useCollapse } from './hooks'
const [collapse, sidebarWidth, setCollapse] = useCollapse()
</script>

<style lang="scss" scoped>
.app-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  .sidebarmenu-wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    box-sizing: border-box;
    will-change: width;
    transition: width 0.26s ease;
    border-right: 1px solid rgba(5, 5, 5, 0.06);
    padding: 0 4px;
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
  }
}
</style>
