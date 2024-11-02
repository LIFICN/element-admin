<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <Transition name="app-fade-transform" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  padding: 13px 13px 0 13px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px; /* 宽度 */
    height: 8px; /* 高度 */
  }

  &::-webkit-scrollbar-track {
    background-color: #fcfcfc; /* 淡色轨道背景 */
    border-radius: 5px; /* 圆角 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd; /* 淡色滑块 */
    border-radius: 5px; /* 圆角 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ccc; /* 更淡的悬停颜色 */
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #bbb; /* 最淡的滑动颜色 */
  }

  /* fade-transform */
  .app-fade-transform-leave-active,
  .app-fade-transform-enter-active {
    will-change: transform, opacity;
    transition: transform 0.2s, opacity 0.2s;
  }

  .app-fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .app-fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
