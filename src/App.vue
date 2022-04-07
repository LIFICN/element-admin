<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref } from 'vue'

const locale = ref(zhCn)
</script>

<style>
@import url('@/styles/transition.scss');

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}

#app {
  height: 100%;
}
</style>
