<template>
  <div
    :class="['menu-item', { 'menu-item-active': activeKey == item.key }]"
    :style="{ 'padding-left': paddingLeftStyle }"
    @click.stop="menuClick"
  >
    <i class="menu-item-icon">#</i>
    <div class="menu-item-content" v-show="!collapse">{{ item.label }}</div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true,
  },
})

const { collapse, activeKey, setActiveKey, getTreeParentMap } = inject('scopeObj')

const paddingLeftStyle = computed(() => {
  const count = getTreeParentMap()[props.item.key]?.length + 1 || 1
  return count * 16 + 'px'
})

function menuClick() {
  setActiveKey(props.item.key)
}
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  color: #333;
  height: 40px;
  box-sizing: border-box;
  padding: 0 16px;
  border-radius: 8px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  &-icon {
    font-size: 12px;
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &-content {
    flex: 1;
    margin-left: 6px;
  }

  &-arrow {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      path {
        fill: #999;
      }
    }
  }
}

.menu-item-active {
  background-color: #e6f4ff;
  color: #1677ff !important;

  .menu-item-arrow {
    transform: rotateX(180deg);

    svg {
      path {
        fill: #1677ff;
      }
    }
  }
}
</style>
