<template>
  <div class="nav-bar">
    <span :class="{ 'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse }" @click="menuCollapse"></span>
    <span class="el-icon-setting">小明</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    }
  },
  methods: {
    menuCollapse() {
      const param = !this.isCollapse
      this.isCollapse = param
      this.$emit('menuCollapse', param)
    },
  },
}
</script>

<style lang="scss">
$appHeaderHeight: 50px;
$appHeaderBg: #ffffff;

.nav-bar {
  height: $appHeaderHeight;
  width: 100%;
  background-color: $appHeaderBg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  box-shadow: 0 1px 4px rgb(0, 21, 41, 0.08);

  > :first-child {
    margin-left: 20px;
    font-size: 22px;
  }

  > :last-child {
    margin-right: 20px;
    font-size: 16px;
  }
}
</style>