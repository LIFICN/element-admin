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

<script>
export default {
  emits: ['update:pageIndex'],
  props: {
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
  },
  setup(_, { emit }) {
    const currentChange = (e) => emit('update:pageIndex', e)
    return { currentChange }
  },
}
</script>

<style>
</style>