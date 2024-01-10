<template>
  <slot name="label" />

  <div
    class="v-float-wrap"
    ref="tooltipRef"
    v-show="isMouseInSlot"
    @mouseenter="tooltipMouseEnter"
    @mouseleave="tooltipMouseLeave"
    @click="closeClick"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { computePosition, offset } from '@floating-ui/dom'

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom',
  },
})

const tooltipRef = ref('')
const labelSlotRef = ref('')
const isMouseInSlot = ref(false)

onMounted(() => {
  labelSlotRef.value = tooltipRef.value.previousElementSibling
  labelSlotRef.value.addEventListener('mouseenter', slotMouseEnter)
  labelSlotRef.value.addEventListener('mouseleave', slotMouseLeave)
})

onBeforeUnmount(() => {
  labelSlotRef.value.removeEventListener('mouseenter', slotMouseEnter)
  labelSlotRef.value.removeEventListener('mouseleave', slotMouseLeave)
})

function updatePosition() {
  nextTick(() => {
    computePosition(labelSlotRef.value, tooltipRef.value, {
      placement: props.placement || 'bottom',
      strategy: 'absolute',
      middleware: [offset({ mainAxis: 8 })],
    }).then(({ x, y }) => {
      Object.assign(tooltipRef.value.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  })
}

//清除掉mouse leave事件逻辑
let clearTimer = null

function slotMouseEnter() {
  isMouseInSlot.value = true
  clearTimer?.()
  updatePosition()
}

function slotMouseLeave() {
  clearTimer = startCloseTimeout()
}

function tooltipMouseEnter() {
  isMouseInSlot.value = true
  clearTimer?.()
}

function tooltipMouseLeave() {
  clearTimer = startCloseTimeout()
}

function closeClick() {
  isMouseInSlot.value = false
  clearTimer = null
}

//解决两个元素切换触发mouse leave关闭弹窗的问题
function startCloseTimeout() {
  let timer = setTimeout(() => {
    isMouseInSlot.value = false
    timer = null
  }, 300)

  return () => {
    clearTimeout(timer)
    clearTimer = null
  }
}
</script>

<style lang="scss" scoped>
.v-float-wrap {
  position: absolute;
  z-index: 999;
}
</style>
