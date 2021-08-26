<template>
  <el-menu
    :default-active="currentPath"
    class="sidebar-menu"
    :collapse="isCollapse"
    :router="true"
    :collapse-transition="false"
    :unique-opened="false"
  >
    <MenuItem v-for="(item, index) in routes" :key="'menuItem' + index" :item="item" />
  </el-menu>
</template>

<script>
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    MenuItem,
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const currentPath = computed(() => route.fullPath)
    const routes = computed(() => store.getters.routes.filter((el) => el.path != '/')) //获取路由列表
    return { currentPath, routes }
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
  overflow-x: hidden;

  &:not(.el-menu--collapse) {
    width: 100%;
  }

  .el-menu {
    background-color: $sidebarBg !important;
  }

  .el-menu-item,
  .el-sub-menu__title {
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
    .el-sub-menu__title {
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