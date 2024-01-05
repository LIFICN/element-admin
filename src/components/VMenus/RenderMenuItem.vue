<template>
  <template v-if="isFirstLevel">
    <VToolTip :item="item" v-if="!hasChildren">
      <MenuItem :item="item" />
    </VToolTip>

    <VMenusToolTip :item="item" v-else-if="hasChildren">
      <Submenu :item="item">
        <RenderMenuItem v-for="it in item.children" :key="it.key" :item="it" />
      </Submenu>
    </VMenusToolTip>
  </template>

  <template v-else>
    <MenuItem :item="item" v-if="!hasChildren" />
    <Submenu :item="item" v-else-if="hasChildren">
      <RenderMenuItem v-for="it in item.children" :key="it.key" :item="it" />
    </Submenu>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
import VToolTip from './VToolTip.vue'
import { useInjectMeunsKey } from './hooks'
import VMenusToolTip from './VMenusToolTip.vue'

const props = defineProps({
  item: {
    type: Object, //item数据对象
    default: function () {
      return {}
    },
  },
})

const { treeParentMap } = useInjectMeunsKey()
const hasChildren = computed(() => props.item.children && props.item.children.length > 0)
const isFirstLevel = computed(() => (treeParentMap.value[props.item.key] ? false : true))
</script>

<style></style>
