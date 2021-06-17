<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="currentPage"
    @current-change="currentChange"
    :page-size="pageSize"
    :pager-count="pagerCount"
  >
  </el-pagination>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    total: {
      type: Number,
      default: 0,
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
    const currentPage = ref(1)

    const currentChange = (e) => {
      currentPage.value = e
      emit('change', e)
    }

    return { currentPage, currentChange }
  },
}
</script>

<style>
</style>