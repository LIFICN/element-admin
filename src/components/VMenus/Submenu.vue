<template>
  <div class="v-submenu">
    <MenuItem :item="item" type="submenuItem" v-model:expand="expand" />

    <CollapseTransition>
      <div v-show="expand && !collapse">
        <slot />
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CollapseTransition from './CollapseTransition.vue'
import MenuItem from './MenuItem.vue'
import { useInjectMeunsKey } from './hooks'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true,
  },
})

const { collapse } = useInjectMeunsKey()
const expand = ref(false)
</script>

<style lang="scss" scoped>
.v-submenu {
  // background-color: rgba(0, 0, 0, 0.02);
  position: relative;
}
</style>
