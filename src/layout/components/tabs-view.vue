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
export default {
  data() {
    return {
      tabList: [],
      currentIndex: 0,
    }
  },
  watch: {
    currentRoute: {
      deep: true,
      immediate: true,
      handler(newVal, _) {
        if (newVal && !this.tabList.some((el) => el.title == newVal.title)) {
          this.tabList.push(newVal)
        }

        this.currentIndex = this.tabList.findIndex((el) => el.title == newVal.title)
      },
    },
    currentIndex: {
      handler(newVal, _) {
        this.srollTo(`appTabItem${newVal}`)
      },
    },
  },
  computed: {
    currentRoute() {
      const param = {
        ...this.$route.meta,
        path: this.$route.path,
      }

      return param || {}
    },
  },
  methods: {
    tabRemove(target) {
      const lastIndex = this.tabList.length - 1
      this.tabList.splice(target, 1)

      //删除当前选项卡左边选项卡
      if (target < this.currentIndex) {
        this.currentIndex-- //位置向后偏移
        return
      }

      //删除当前选项卡
      if (target == this.currentIndex) {
        //位置向后偏移
        if (target == lastIndex) this.currentIndex--
        else this.currentIndex = target //位置不偏移(当前元素已删除),自动切换下一个元素

        this.$router.replace(this.tabList[this.currentIndex].path)
      }
    },
    tabClick(index) {
      this.currentIndex = index
      const currentTab = this.tabList[index]
      this.$router.replace(currentTab.path)
    },
    srollTo(tag) {
      this.$nextTick(() => {
        const target = document.getElementById(tag)
        target.parentNode.parentNode.scrollLeft = target.offsetLeft - 20 //因为有左右padding所以减去20
      })
    },
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
        font-size: 14px;
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