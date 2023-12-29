<template>
  <div class="app-container">
    <SidebarMenu ref="sidebarMenu" :collapse="collapse" :width="sidebarWidth" @change="setCollapse" />

    <div class="main-container" :style="{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }">
      <Navbar />
      <TabsView />

      <div class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from './components/SidebarMenu/index.vue'
import Navbar from './components/Navbar/index.vue'
import TabsView from './components/TabsView/index.vue'
import { useCollapse } from './hooks'

const [collapse, sidebarWidth, setCollapse] = useCollapse()
</script>

<style lang="scss" scoped>
.app-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

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
      overflow-y: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 10px; /* 宽度 */
        height: 10px; /* 高度 */
      }

      &::-webkit-scrollbar-track {
        background-color: #fcfcfc; /* 淡色轨道背景 */
        border-radius: 5px; /* 圆角 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: #ddd; /* 淡色滑块 */
        border-radius: 5px; /* 圆角 */
        border: 2px solid #fcfcfc; /* 边框 */
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #ccc; /* 更淡的悬停颜色 */
      }

      &::-webkit-scrollbar-thumb:active {
        background-color: #bbb; /* 最淡的滑动颜色 */
      }
    }
  }
}
</style>
