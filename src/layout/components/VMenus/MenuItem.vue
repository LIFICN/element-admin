<template>
  <div
    :class="[
      'menu-item',
      { 'menu-item-active': activeMenu && !isSubmenuItem },
      { 'submenu-item-expand': expand && isSubmenuItem },
      { 'submenu-item-active': isSubmenuItem && activeSubmenu },
    ]"
    :style="{ 'padding-left': paddingLeftStyle, 'justify-content': collapse ? 'center' : '' }"
    @click.stop="menuClick"
  >
    <slots.icon :item="item" :active="mergeActive" class="menu-item-icon" v-if="slots.icon" />
    <i :class="['menu-item-icon', item.icon]" v-else-if="item.icon" />

    <div class="menu-item-content" v-show="!collapse">
      <slots.label :item="item" :active="mergeActive" v-if="slots.label" />
      <span v-else>{{ item.label }}</span>
    </div>

    <i class="submenu-item-arrow" v-if="!collapse && isSubmenuItem">
      <svg viewBox="0 0 1024 1024">
        <path
          d="M512 693.333333c-14.933333 0-29.866667-4.266667-40.533333-14.933333l-277.33333399-234.666667c-27.733333-23.466667-29.866667-64-8.53333301-89.6 23.466667-27.733333 64-29.866667 89.6-8.53333299L512 546.133333l236.8-200.53333299c27.733333-23.466667 68.266667-19.19999999 89.6 8.53333299 23.466667 27.733333 19.19999999 68.266667-8.53333301 89.6l-277.33333399 234.666667c-10.666667 10.666667-25.6 14.933333-40.533333 14.933333z"
          fill="#999"
        ></path>
      </svg>
    </i>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

const emits = defineEmits(['update:expand'])

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  type: {
    type: String,
    default: '',
  },
  expand: {
    type: Boolean,
    default: false,
  },
})

const { collapse, activeKey, setActiveKey, getTreeParentMap, slots } = inject('scopeObj')

const isSubmenuItem = computed(() => props.type == 'submenuItem')
const paddingLeftStyle = computed(() => {
  const count = getTreeParentMap()[props.item.key]?.length + 1 || 1
  return count * 16 + 'px'
})

const activeSubmenu = computed(() => {
  return getTreeParentMap()[activeKey.value]?.includes(props.item) || false
})

const activeMenu = computed(() => {
  return activeKey.value == props.item.key
})

const mergeActive = computed(() => {
  if (!isSubmenuItem.value) return activeMenu.value
  return activeSubmenu.value
})

function menuClick() {
  if (!isSubmenuItem.value) setActiveKey(props.item.key)
  else expandMenu()
}

function expandMenu() {
  if (collapse.value) return
  emits('update:expand', !props.expand)
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
    font-size: 14px;
  }
}

.submenu-item-arrow {
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

.menu-item-active {
  background-color: #e6f4ff !important;
  color: #1677ff !important;
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
