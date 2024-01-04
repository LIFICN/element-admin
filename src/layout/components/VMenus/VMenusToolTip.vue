<template>
  <slot />

  <div
    class="v-menu-tooltip"
    ref="tooltipRef"
    v-show="collapse && mergeEnter && showMenu"
    @mouseenter="tooltipMouseEnter"
    @mouseleave="tooltipMouseLeave"
    @click="closeClick"
  >
    <div class="v-menu-tooltip-menus" v-if="collapse && mergeEnter && showMenu">
      <VMenusToolTip v-for="it in item.children" :item="it" :key="it.key">
        <FloatMenuItem :item="it" />
      </VMenusToolTip>
    </div>
  </div>
</template>

<script setup>
import { computePosition, offset } from '@floating-ui/dom'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useInjectMeunsKey } from './hooks'
import FloatMenuItem from './FloatMenuItem.vue'

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
const isTooltipMouseEnter = ref(false)
const { collapse } = useInjectMeunsKey()
const showMenu = computed(() => props.item.children && props.item.children.length > 0)
const mergeEnter = computed(() => isTooltipMouseEnter.value || isSlotEnter.value)

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

function tooltipMouseEnter() {
  isTooltipMouseEnter.value = true
}

function tooltipMouseLeave() {
  isTooltipMouseEnter.value = false
}

function closeClick() {
  isSlotEnter.value = false
  isTooltipMouseEnter.value = false
}
</script>

<style lang="scss" scoped>
.v-menu-tooltip {
  position: absolute;
  z-index: 999;

  &-menus {
    background-color: white;
    padding: 4px 4px 1px 4px;
    border-radius: 8px;
    white-space: nowrap;
    min-width: 160px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    position: relative;

    &::before {
      position: absolute;
      content: ' ';
      background-color: transparent;
      width: 10px;
      height: 100%;
      display: block;
      left: -10px;
      top: 0;
    }
  }
}
</style>
