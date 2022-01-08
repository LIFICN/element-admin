<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="pageIndex"
    @current-change="currentChange"
    :page-size="pageSize"
    :pager-count="pagerCount"
  >
  </el-pagination>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emits = defineEmits(['update:pageIndex'])

defineProps({
  total: {
    type: Number,
    default: 0,
  },
  pageIndex: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pagerCount: {
    type: Number,
    default: 7,
  },
})

const currentChange = (e) => emits('update:pageIndex', e)
</script>

<style>
</style>