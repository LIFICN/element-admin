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
import { storeToRefs } from 'pinia'
import SidebarItem from './SidebarItem.vue'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const currentPath = computed(() => route.fullPath)
const { routesGetter: routes } = storeToRefs(useRouteStore()) //获取路由列表
</script>

<style lang="scss">
$sidebarBg: #304156;
$sidebarText: #bfcbd9;
$sidebarTextActive: #409eff;
$sidebarMenuHover: #263445;

.sidebar-menu {
  height: 100%;
  width: 100%;
  background-color: $sidebarBg;
  overflow-x: hidden;
  border: none;

  &:not(.el-menu--collapse) {
    width: 100%;
  }

  .el-menu {
    background-color: $sidebarBg !important;
  }

  .el-menu-item,
  .el-sub-menu__title {
    color: $sidebarText;

    i {
      color: $sidebarText;
    }

    &:hover {
      background-color: $sidebarMenuHover !important;
    }
  }

  .el-menu-item.is-active {
    color: $sidebarTextActive;
    background-color: $sidebarBg;

    i {
      color: $sidebarTextActive;
    }
  }
}

.el-menu--vertical {
  .el-menu {
    background-color: $sidebarBg;

    .el-menu-item,
    .el-sub-menu__title {
      color: $sidebarText;

      i {
        color: $sidebarText;
      }

      &:hover {
        background-color: $sidebarMenuHover !important;
      }
    }

    .el-menu-item.is-active {
      color: $sidebarTextActive;
      background-color: $sidebarBg;

      i {
        color: $sidebarTextActive;
      }
    }
  }
}
</style>
