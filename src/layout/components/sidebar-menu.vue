<template>
  <el-menu
    :default-active="currentPath"
    class="sidebar-menu"
    :collapse="isCollapse"
    :router="true"
    :collapse-transition="false"
    :unique-opened="true"
  >
    <menu-item v-for="(item, index) in routes" :key="'menuItem' + index" :item="item"></menu-item>
  </el-menu>
</template>

<script>
import menuItem from './menu-item.vue'

export default {
  components: {
    menuItem,
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPath() {
      return this.$route.fullPath
    },
    routes() {
      //获取路由列表
      return this.$router.options.routes.slice(1)
    },
  },
}
</script>

<style lang="scss">
$sidebarBg: #304156;
$slidebarText: #bfcbd9;
$slidebarTextActive: #409eff;
$slidebarMenuHover: #263445;

.sidebar-menu {
  height: 100%;
  width: 100%;
  background-color: $sidebarBg;

  &:not(.el-menu--collapse) {
    width: 100%;
  }

  .el-menu {
    background-color: $sidebarBg !important;
  }

  .el-menu-item,
  .el-submenu__title {
    color: $slidebarText;

    i {
      color: $slidebarText;
    }

    &:hover {
      background-color: $slidebarMenuHover !important;
    }
  }

  .el-menu-item.is-active {
    color: $slidebarTextActive;
    background-color: $sidebarBg;

    i {
      color: $slidebarTextActive;
    }
  }
}

.el-menu--vertical {
  .el-menu {
    background-color: $sidebarBg;

    .el-menu-item,
    .el-submenu__title {
      color: $slidebarText;

      i {
        color: $slidebarText;
      }

      &:hover {
        background-color: $slidebarMenuHover !important;
      }
    }

    .el-menu-item.is-active {
      color: $slidebarTextActive;
      background-color: $sidebarBg;

      i {
        color: $slidebarTextActive;
      }
    }
  }
}
</style>