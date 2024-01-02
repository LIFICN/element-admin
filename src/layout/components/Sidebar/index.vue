<template>
  <div class="sidebar-container" :style="{ width: width }">
    <Logo :collapse="collapse" />
    <VMenus :collapse="collapse" :list="list" :active-key="activeKey">
      <template #icon="{ item, active }">
        <el-icon :color="active ? '#1677ff' : 'inherit'" :size="16">
          <component :is="item.icon" />
        </el-icon>
      </template>
    </VMenus>

    <div
      class="collapse-btn"
      @click.stop="emits('collapse-change')"
      :style="{ transform: collapse ? 'rotateY(180deg)' : '' }"
    >
      <svg viewBox="0 0 1024 1024" aria-hidden="true">
        <path
          d="M707.323 960.556l56.093-54.503-403.917-392.469 403.917-392.475-56.093-54.502L247.32 513.584l460.004 446.972z m0 0z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import VMenus from '../VMenus/index.vue'

defineProps({
  list: {
    type: Array,
    default: () => [],
    required: true,
  },
  collapse: {
    type: Boolean,
    default: false,
    required: true,
  },
  width: {
    type: String,
    default: '240px',
  },
  activeKey: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['collapse-change'])
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: relative;
  box-sizing: border-box;
}

.collapse-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  top: 14px;
  right: -16px;
  z-index: 99;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.07), 0 1px 4px -1px rgba(25, 15, 15, 0.09), 0 0 1px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;

  svg {
    width: 10px;
    height: 10px;

    path {
      fill: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
