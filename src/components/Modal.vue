<template>
  <el-dialog
    custom-class="custom-modal-wrap"
    :title="title"
    v-model="state.dialogFormVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="width"
  >
    <slot />
    <template v-if="showFooter" #footer>
      <span class="dialog-footer">
        <el-button @click="canel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue'

const emits = defineEmits(['canel', 'submit'])

defineProps({
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
})

const state = reactive({
  dialogFormVisible: false,
})

const canel = () => emits('canel')
const submit = () => emits('submit')
const open = () => (state.dialogFormVisible = true)
const close = () => (state.dialogFormVisible = false)

defineExpose({
  open,
  close,
})
</script>

<style lang="scss">
.custom-modal-wrap {
  .el-dialog__body {
    overflow: hidden;
  }
}
</style>