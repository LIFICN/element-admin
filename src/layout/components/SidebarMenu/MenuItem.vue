<template>
  <div :class="['menu-item', { 'menu-item-active': active }]">
    <i class="menu-item-icon">#</i>
    <div class="menu-item-content">title</div>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  color: #333;
  height: 40px;
  box-sizing: border-box;
  padding: 0 20px;
  border-radius: 8px;
  margin-bottom: 4px;

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
