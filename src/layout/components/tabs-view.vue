<template>
  <el-scrollbar class="tab-scrollbar">
    <div class="tabs-view">
      <div
        :class="[{ active: currentIndex == index }, 'tab-item']"
        :key="item.title"
        v-for="(item, index) in tabList"
        @click="tabClick(index)"
      >
        <span class="title">{{ item.title }}</span>
        <span class="close el-icon-close" @click.stop="tabRemove(index)"></span>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { getTransitionRawChildren } from 'vue'
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
      this.tabList.splice(target, 1)

      if (target == this.currentIndex) {
        if (target == 0) this.currentIndex = 0
        else this.currentIndex--

        this.$router.replace(this.tabList[this.currentIndex].path)
      } else {
        if (target < this.currentIndex) {
          this.currentIndex--
          if (this.currentIndex < 0) this.currentIndex = 0
        }
      }
    },
    tabClick(index) {
      this.currentIndex = index
      const currentTab = this.tabList[index]
      this.$router.replace(currentTab.path)
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-scrollbar {
  padding: 10px 20px;
  box-shadow: 0 1px 4px rgb(0, 21, 41, 0.08);
}

.tabs-view {
  display: flex;
  align-items: center;
  box-sizing: border-box;

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
      padding: 0 20px;
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
</style>