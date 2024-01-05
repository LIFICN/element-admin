<template>
  <slot />

  <FloatingTransition>
    <div
      class="v-menu-tooltip"
      ref="tooltipRef"
      v-show="collapse && showMenu && mergeEnter"
      @mouseenter="tooltipMouseEnter"
      @mouseleave="tooltipMouseLeave"
      @click="closeClick"
    >
      <div class="v-menu-tooltip-menus" v-if="collapse && showMenu && mergeEnter">
        <VMenusToolTip v-for="it in item.children" :item="it" :key="it.key">
          <FloatMenuItem :item="it" />
        </VMenusToolTip>
      </div>
    </div>
  </FloatingTransition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useInjectMeunsKey, useFloatingPosition } from './hooks'
import FloatMenuItem from './FloatMenuItem.vue'
import FloatingTransition from './FloatingTransition.vue'

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
const isMouseInSlot = ref(false)
const { collapse } = useInjectMeunsKey()
const [updatePosition] = useFloatingPosition(slotRef, tooltipRef)
const showMenu = computed(() => props.item.children && props.item.children.length > 0)
const mergeEnter = computed(() => isMouseInSlot.value)

onMounted(() => {
  slotRef.value = tooltipRef.value.previousElementSibling
  slotRef.value.addEventListener('mouseenter', slotMouseEnter)
  slotRef.value.addEventListener('mouseleave', slotMouseLeave)
})

onBeforeUnmount(() => {
  slotRef.value.removeEventListener('mouseenter', slotMouseEnter)
  slotRef.value.removeEventListener('mouseleave', slotMouseLeave)
})

//清除掉mouse leave事件逻辑
let clearTimer = null

function slotMouseEnter() {
  isMouseInSlot.value = true
  clearTimer?.()
  if (collapse.value) updatePosition()
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
