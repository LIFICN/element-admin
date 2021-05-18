
<template>
  <div class="app-container">
    <div class="sidebar-container">
      <el-menu :default-active="currentPath" class="sidebar-menu" :collapse="isCollapse" router>
        <el-menu-item index="/dashboard" route="">
          <i class="el-icon-menu"></i>
          <template #title>首页</template>
        </el-menu-item>

        <el-submenu index="2">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航二</span>
          </template>

          <el-menu-item index="/test">test</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <el-scrollbar class="main-container">
      <div class="app-header">
        <span
          :class="{ 'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse }"
          @click="isCollapse = !isCollapse"
        ></span>
        <span class="el-icon-setting">小明</span>
      </div>

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
export default {
  data() {
    return {
      isCollapse: true,
    }
  },
  computed: {
    currentPath() {
      return this.$route.fullPath
    },
  },
}
</script>

<style lang="scss" scped>
.app-container {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  .sidebar-container {
    .sidebar-menu {
      height: 100%;

      &:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
    }
  }

  .main-container {
    flex: 1;
    overflow: hidden;

    .app-header {
      height: 60px;
      width: 100%;
      background-color: #b3c0d1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333;

      > :first-child {
        margin-left: 20px;
        font-size: 22px;
      }

      > :last-child {
        margin-right: 20px;
        font-size: 16px;
      }
    }

    .app-main {
      padding: 20px;
    }
  }
}
</style>
