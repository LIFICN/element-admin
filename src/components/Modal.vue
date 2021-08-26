<template>
  <el-dialog
    custom-class="global-modal"
    :title="title"
    v-model="dialogFormVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="width"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer" v-if="showFooter">
        <el-button @click="canel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  emits: ['canel', 'submit'], //去掉警告
  props: {
    width: {
      type: String,
      default: '600px',
    },
    title: {
      type: String,
      default: '',
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const state = reactive({
      dialogFormVisible: false,
      canel: () => emit('canel'),
      submit: () => emit('submit'),
      open: () => (state.dialogFormVisible = true),
      close: () => (state.dialogFormVisible = false),
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="scss" scoped>
.global-modal {
  ::v-deep(.el-dialog__body) {
    overflow: hidden;
  }
}
</style>