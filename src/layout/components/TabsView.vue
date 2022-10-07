<template>
  <el-scrollbar class="tab-scrollbar" view-class="tabs-view">
    <div
      :class="[{ active: state.currentIndex == index }, 'tab-item']"
      v-for="(item, index) in state.tabList"
      :key="getKey(item.title)"
      :id="`appTabItem${index}`"
      @click="tabClick(index)"
    >
      <span class="title">{{ item.title }}</span>
      <el-icon class="close-icon" @click.stop="tabRemove(index)" v-if="!item.affix">
        <CloseIcon />
      </el-icon>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { reactive, watch, computed, nextTick } from 'vue'
import { RouteMeta, useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '@/store/route'
import { RouteRecordRawExt } from '@/router'
import { storeToRefs } from 'pinia'

type RouteMetaExt = RouteMeta & {
  path: string
}

const route = useRoute()
const router = useRouter()
let affixRoutes: RouteMetaExt[] = []

const state = reactive({
  tabList: [] as RouteMetaExt[],
  currentIndex: 0 as number,
})

const { routesGetter: routesArr } = storeToRefs(useRouteStore())

const currentRoute = computed(() => {
  const param: RouteMetaExt = {
    ...route.meta,
    path: route.fullPath,
  }

  return param || {}
})

function tabRemove(target: number) {
  const lastIndex = state.tabList.length - 1
  state.tabList.splice(target, 1)

  //删除当前选项卡左边选项卡
  if (target < state.currentIndex) {
    state.currentIndex-- //位置向后偏移
    return
  }

  //删除当前选项卡
  if (target == state.currentIndex) {
    //位置向后偏移
    if (target == lastIndex) state.currentIndex--
    else state.currentIndex = target //位置不偏移(当前元素已删除),自动切换下一个元素

    router.replace(state.tabList[state.currentIndex].path)
  }
}

function tabClick(index: number) {
  state.currentIndex = index
  const currentTab = state.tabList[index]
  router.replace(currentTab.path)
}

function srollTo(tag: string) {
  nextTick(() => {
    const target = document.getElementById(tag) as HTMLElement
    if (!target) return
    const item = target!.parentNode!.parentNode! as HTMLElement
    item.scrollLeft = target.offsetLeft - 20 //因为有左右padding所以减去20
  })
}

function watchCurrentRoute(newVal: RouteMetaExt) {
  if (newVal && !state.tabList.some((el) => el.title === newVal.title)) {
    state.tabList.push(newVal)
  }

  state.currentIndex = state.tabList.findIndex((el) => el.title === newVal.title)
}

function watchCurrentIndex(newVal: number) {
  srollTo(`appTabItem${newVal}`)
}

function watchRoutesArr(newVal: RouteRecordRawExt[], oldVal: RouteRecordRawExt[] | undefined) {
  if (oldVal && newVal.length === oldVal.length) return

  affixRoutes = []
  newVal.forEach((el) => recursionRoutes(el))

  let addArr: RouteMetaExt[] = []
  affixRoutes.forEach((el) => {
    if (!state.tabList.some((tb) => tb.title === el.title)) addArr.push(el)
  })

  const first = state.tabList.filter((el) => el.affix)
  const second = state.tabList.filter((el) => !el.affix)
  state.tabList = [...first, ...addArr, ...second]
}

function recursionRoutes(val: RouteRecordRawExt) {
  const { path: rootPath, children, meta } = val

  if (meta && meta.affix) affixRoutes.push({ ...meta, path: rootPath })
  if (!children) return

  children.forEach((el) => {
    let basePath = el.path ? `${rootPath}/${el.path}` : rootPath
    recursionRoutes({ path: basePath, meta: el.meta, children: el.children } as RouteRecordRawExt)
  })
}

const getKey = (param: unknown): string => param as string

watch(() => state.currentIndex, watchCurrentIndex)
watch(() => [...routesArr.value], watchRoutesArr, { deep: true, immediate: true })
watch(() => ({ ...currentRoute.value }), watchCurrentRoute, { deep: true, immediate: true })
</script>

<style lang="scss" scoped>
.tab-scrollbar {
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0, 21, 41, 0.08);
  height: 50px;
  box-sizing: border-box;

  ::v-deep(.tabs-view) {
    display: flex;
    align-items: center;
    height: 100%;

    .tab-item {
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      height: 28px;
      cursor: pointer;
      color: #303133;
      margin-right: 8px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;

      .title {
        font-size: 14px;
        font-weight: 500;
      }

      .close-icon {
        color: #999999;
        font-size: 12px;
        margin-left: 10px;
      }
    }

    .active {
      color: #1890ff;
      background: #e8f4ff;
      border: 1px solid #1890ff;

      .close-icon {
        color: #1890ff;
      }
    }
  }
}
</style>
