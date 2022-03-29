<template>
  <el-menu
    :default-active="currentPath"
    class="sidebar-menu"
    :collapse="isCollapse"
    :router="true"
    :collapse-transition="false"
    :unique-opened="false"
  >
    <SidebarItem v-for="(item, index) in routes" :key="'sidebarItem' + index" :item="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouteStore } from '@/store/route'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const store = useRouteStore()
const route = useRoute()
const currentPath = computed(() => route.fullPath)
const routes = computed(() => store.routesGetter) //获取路由列表
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
