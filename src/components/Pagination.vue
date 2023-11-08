<template>
  <el-pagination
    background
    :layout="layout"
    :total="total"
    v-model:currentPage="state.currentPage"
    v-model:pageSize="state.pageSize"
    :page-sizes="pageSizes"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
const emits = defineEmits(['update:currentPage', 'update:pageSize', 'change'])

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next',
  },
  pageSizes: {
    type: Array,
    default: () => [10, 50, 100, 200],
  },
})

const state = reactive({ currentPage: 1, pageSize: 10 })

watch(
  () => state.currentPage,
  (val, _) => {
    emits('update:currentPage', val)
    emits('change')
  }
)

watch(
  () => state.pageSize,
  (val, _) => {
    emits('update:pageSize', val)
    emits('change')
  }
)

watch(
  () => props.currentPage,
  (val, _) => (state.currentPage = val),
  { immediate: true }
)

watch(
  () => props.pageSize,
  (val, _) => (state.pageSize = val),
  { immediate: true }
)
</script>

<style></style>
