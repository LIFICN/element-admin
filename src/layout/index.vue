<template>
  <div class="app-container">
    <div class="sidebarmenu-wrap" :style="{ width: sidebarWidth }">
      <Logo :collapse="collapse" />

      <VMenus :collapse="collapse" :active-key="activeKey" :list="menusList" @menu-item-click="menuItemClick">
        <template v-slot:icon="{ item, active }">
          <i
            :style="{ color: active ? '#1677ff' : 'inherit', width: '16px', height: '16px' }"
            v-if="item.icon == 'Apple'"
          >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="5509">
              <path
                d="M768.47 384.042c-27.87 0-127.359-0.202-127.359-0.202l0 63.882 126.855 0 0 127.876 64.862 0c0 0 0-70.289 0-124.876C832.829 402.41 803.6 384.042 768.47 384.042zM712.395 178.09c-101.314 0-119.218 58.591-165.123 79.616 3.613-32.853 10.772-69.609 24.205-93.007 39.526-68.851 105.686-92.922 106.349-93.157l-0.146 0.051-20.772-60.535c-3.611 1.239-89.045 31.39-140.934 121.778-16.203 28.224-27.16 68.647-32.566 120.146-0.241 2.293-0.465 4.556-0.673 6.784-45.82-18.931-49.878-81.676-171.134-81.676-142.799 0-275.597 141.784-275.597 329.471 0 196.597 216.757 514.439 333.197 514.439 84.787 0 117.548-47.969 142.798-47.969 25.25 0 40.162 47.969 142.799 47.969 130.437 0 333.203-324.084 333.203-514.439C987.998 319.871 835.857 178.09 712.395 178.09zM719.257 920.652c-30.868 27.567-54.017 37.348-64.461 37.348-21.911 0-40.078-2.742-53.998-8.15-10.59-4.114-17.651-9.26-25.826-15.218-13.442-9.796-33.755-24.601-62.974-24.601-26.817 0-46.953 12.221-64.719 23.004-20.221 12.273-41.13 24.964-78.08 24.964-0.179 0-18.952-0.994-58.493-36.415-31.864-28.544-66.803-70.583-98.381-118.374-33.038-50-61.02-103.72-80.919-155.352-20.544-53.305-31.403-101.819-31.403-140.299 0-37.875 6.394-74.365 19.005-108.455 11.78-31.843 28.471-60.357 49.609-84.749 20.127-23.225 43.087-41.363 68.242-53.909 24.424-12.182 49.571-18.358 74.741-18.358 26.035 0 46.323 3.577 60.299 10.633 10.921 5.513 18.724 13.469 28.604 23.543 20.64 21.044 51.831 52.847 111.495 52.847 58.617 0 92.383-30.196 117.037-52.244 23.419-20.943 38.89-34.778 83.361-34.778 43.25 0 95.634 28.112 136.71 73.366 22.902 25.232 41.049 54.039 53.935 85.621 13.907 34.085 20.958 69.911 20.958 106.483 0 76.405-42.241 191.859-107.613 294.135C784.997 850.802 751.411 891.937 719.257 920.652z"
                fill="currentColor"
                p-id="5510"
              ></path>
            </svg>
          </i>
        </template>
      </VMenus>

      <div class="collapse-btn" @click.stop="setCollapse" :style="{ transform: collapse ? 'rotateY(180deg)' : '' }">
        <svg viewBox="0 0 1024 1024" aria-hidden="true">
          <path
            d="M707.323 960.556l56.093-54.503-403.917-392.469 403.917-392.475-56.093-54.502L247.32 513.584l460.004 446.972z m0 0z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="main-container" :style="{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }">
      <Navbar />
      <TabsView />
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Logo from './components/Logo/index.vue'
import Navbar from './components/Navbar/index.vue'
import TabsView from './components/TabsView/index.vue'
import AppMain from './components/AppMain/index.vue'
import { useCollapse, useCovertRoutesToMenus } from './hooks'
import { useRouter, useRoute } from 'vue-router'
import { useRouteStore } from '@/store/route'
import { computed } from 'vue'

const [collapse, sidebarWidth, setCollapse] = useCollapse()
const store = useRouteStore()
const router = useRouter()
const route = useRoute()
const menusList = useCovertRoutesToMenus(store.routesGetter)
const activeKey = computed(() => route.path)

// const menuList = reactive([
//   {
//     key: '1',
//     label: '菜单1',
//   },
//   {
//     key: '2',
//     label: '菜单2',
//     children: [
//       {
//         key: '2-1',
//         label: '菜单2-1',
//       },
//       {
//         key: '2-2',
//         label: '菜单2-2',
//       },
//     ],
//   },
// ])

const menuItemClick = (menuItem) => {
  router.push(menuItem.key)
}
</script>

<style lang="scss" scoped>
.app-container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;

  .sidebarmenu-wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    box-sizing: border-box;
    will-change: width;
    transition: width 0.26s ease-in-out;
    border-right: 1px solid rgba(5, 5, 5, 0.06);
    padding: 0 4px;

    .collapse-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      position: absolute;
      top: 14px;
      right: -16px;
      z-index: 99;
      background-color: #ffffff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.23);
      cursor: pointer;
      will-change: transform;
      transition: transform 0.3s;

      svg {
        width: 10px;
        height: 10px;

        path {
          fill: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  .main-container {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    will-change: left;
    transition: left 0.26s ease-in-out;
    height: 100%;
  }
}
</style>
