<template>
  <el-scrollbar class="tab-scrollbar" view-class="tabs-view">
    <div
      :class="[{ active: currentIndex == index }, 'tab-item']"
      :key="item.title"
      v-for="(item, index) in tabList"
      @click="tabClick(index)"
      :id="`appTabItem${index}`"
    >
      <span class="title">{{ item.title }}</span>
      <span class="close el-icon-close" @click.stop="tabRemove(index)" v-if="!item.affix"></span>
    </div>
  </el-scrollbar>
</template>

<script>
import { reactive, toRefs, watch, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      tabList: [],
      currentIndex: 0,
      currentRoute: computed(() => {
        const param = {
          ...route.meta,
          path: route.path,
        }

        return param || {}
      }),
      tabRemove(target) {
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
      },
      tabClick(index) {
        state.currentIndex = index
        const currentTab = state.tabList[index]
        router.replace(currentTab.path)
      },
      srollTo(tag) {
        nextTick(() => {
          const target = document.getElementById(tag)
          if (!target) return
          target.parentNode.parentNode.scrollLeft = target.offsetLeft - 20 //因为有左右padding所以减去20
        })
      },
      watchCurrentRoute(newVal, _) {
        if (newVal && !state.tabList.some((el) => el.title == newVal.title)) {
          state.tabList.push(newVal)
        }

        state.currentIndex = state.tabList.findIndex((el) => el.title == newVal.title)
      },
      watchCurrentIndex(newVal, _) {
        state.srollTo(`appTabItem${newVal}`)
      },
    })

    watch(() => state.currentRoute, state.watchCurrentRoute, { deep: true, immediate: true })
    watch(() => state.currentIndex, state.watchCurrentIndex)

    return { ...toRefs(state) }
  },
}
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
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      color: #303133;
      margin-right: 6px;
      white-space: nowrap;

      .title {
        font-size: 14px;
        font-weight: 500;
        padding: 0 10px;
      }

      .close {
        color: #999999;
        font-size: 10px;
        font-weight: lighter;
        padding-right: 10px;
      }
    }

    .active {
      color: #1890ff;
      background: #e8f4ff;
      border: 1px solid #1890ff;

      .close {
        color: #1890ff;
      }
    }
  }
}
</style>