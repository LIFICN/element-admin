<template>
  <el-dialog
    class="custom-modal-wrap"
    :title="title"
    v-model="dialogVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :destroy-on-close="destroyOnClose"
    @closed="closed"
  >
    <slot />
    <template v-if="showFooter" #footer>
      <span>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['cancel', 'submit', 'update:modelValue'])

const props = defineProps({
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
  fullscreen: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: '15vh',
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const dialogVisible = ref(false)

const cancel = () => emits('cancel')
const submit = () => emits('submit')
const closed = () => emits('update:modelValue', false)

watch(
  () => props.modelValue,
  (val) => (dialogVisible.value = val),
  { immediate: true }
)
</script>

<style lang="scss">
.custom-modal-wrap {
  .el-dialog__body {
    overflow: hidden;
  }
}
</style>
