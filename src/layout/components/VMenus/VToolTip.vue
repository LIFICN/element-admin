<template>
  <slot />
  <div class="v-tooltip" ref="tooltipRef" v-show="collapse && isSlotEnter">
    <span class="v-tooltip-label" v-if="collapse && isSlotEnter">{{ item.label }}</span>
  </div>
</template>

<script setup>
import { computePosition, offset } from '@floating-ui/dom'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useInjectMeunsKey } from './hooks'

const props = defineProps({
  item: {
    type: Object,
    default: function () {
      return {}
    },
  },
})

const tooltipRef = ref('')
const slotRef = ref('')
const isSlotEnter = ref(false)
const { collapse } = useInjectMeunsKey()

onMounted(() => {
  slotRef.value = tooltipRef.value.previousElementSibling
  slotRef.value.addEventListener('mouseenter', slotMouseEnter)
  slotRef.value.addEventListener('mouseleave', slotMouseLeave)
})

onBeforeUnmount(() => {
  slotRef.value.removeEventListener('mouseenter', slotMouseEnter)
  slotRef.value.removeEventListener('mouseleave', slotMouseLeave)
})

function updatePosition() {
  computePosition(slotRef.value, tooltipRef.value, {
    placement: 'right',
    strategy: 'absolute',
    middleware: [offset({ mainAxis: 8 })],
  }).then(({ x, y }) => {
    Object.assign(tooltipRef.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    })
  })
}

function slotMouseEnter() {
  isSlotEnter.value = true
  if (collapse.value) updatePosition()
}

function slotMouseLeave() {
  isSlotEnter.value = false
}
</script>

<style lang="scss" scoped>
.v-tooltip {
  position: absolute;
  z-index: 999;

  &-label {
    width: max-content;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px;
    border-radius: 4px;
    font-size: 14px;
  }
}
</style>
