<template>
  <div class="app-submenu">
    <div
      :class="['submenu-item', { 'submenu-item-expand': expand }, { 'submenu-item-active': active }]"
      @click="expand = !expand"
    >
      <i class="submenu-item-icon">#</i>
      <div class="submenu-item-content">title</div>

      <i class="submenu-item-arrow">
        <svg viewBox="0 0 1024 1024">
          <path
            d="M512 693.333333c-14.933333 0-29.866667-4.266667-40.533333-14.933333l-277.33333399-234.666667c-27.733333-23.466667-29.866667-64-8.53333301-89.6 23.466667-27.733333 64-29.866667 89.6-8.53333299L512 546.133333l236.8-200.53333299c27.733333-23.466667 68.266667-19.19999999 89.6 8.53333299 23.466667 27.733333 19.19999999 68.266667-8.53333301 89.6l-277.33333399 234.666667c-10.666667 10.666667-25.6 14.933333-40.533333 14.933333z"
            fill="#999"
          ></path>
        </svg>
      </i>
    </div>

    <CollapseTransition>
      <div v-show="expand">
        <MenuItem v-for="n in 3" :key="n" />
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import CollapseTransition from './CollapseTransition.vue'

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})

import { ref } from 'vue'
const expand = ref(false)
</script>

<style lang="scss" scoped>
.app-submenu {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>

<style lang="scss" scoped>
.submenu-item {
  display: flex;
  align-items: center;
  color: #333;
  height: 40px;
  box-sizing: border-box;
  padding: 0 20px;
  border-radius: 8px;
  margin-bottom: 4px;
  background-color: #fff;

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

.submenu-item-expand {
  .submenu-item-arrow {
    transform: rotateX(180deg);
  }
}

.submenu-item-active {
  color: #1677ff !important;

  .submenu-item-arrow {
    svg {
      path {
        fill: #1677ff;
      }
    }
  }
}
</style>
