<template>
  <slot />
  <div class="v-tooltip" ref="tooltipRef" v-show="collapse && isEnter">
    <span class="v-tooltip-label" v-if="!showMenu">{{ item.label }}</span>
  </div>
</template>

<script setup>
import { computePosition, offset } from '@floating-ui/dom'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
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
const isEnter = ref(false)
const { collapse } = useInjectMeunsKey()
const showMenu = computed(() => props.item.children && props.item.children.length > 0)

onMounted(() => {
  slotRef.value = tooltipRef.value.previousElementSibling
  slotRef.value.addEventListener('mouseenter', mouseenter)
  slotRef.value.addEventListener('mouseleave', mouseleave)
})

onBeforeUnmount(() => {
  slotRef.value.removeEventListener('mouseenter', mouseenter)
  slotRef.value.removeEventListener('mouseleave', mouseleave)
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

function mouseenter() {
  isEnter.value = true
  if (collapse.value) updatePosition()
}

function mouseleave() {
  isEnter.value = -false
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
