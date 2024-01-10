import { defineComponent, computed } from 'vue'
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
import VToolTip from './VToolTip.vue'
import { useInjectMeunsKey } from './hooks'
import VMenusToolTip from './VMenusToolTip.vue'

const RenderMenuItem = defineComponent({
  props: {
    item: {
      type: Object, //item数据对象
      default: function () {
        return {}
      },
    },
  },
  setup(props) {
    const menuItemData = props.item
    const { treeParentMap } = useInjectMeunsKey()
    const hasChildren = computed(() => menuItemData.children && menuItemData.children.length > 0)
    const isFirstLevel = computed(() => (treeParentMap.value[menuItemData.key] ? false : true))

    const meunItemFuc = () => <MenuItem item={menuItemData} />

    const submenuItemFuc = () => (
      <Submenu item={menuItemData}>
        {{
          default: () => menuItemData.children?.map((it) => <RenderMenuItem key={it.key} item={it} />),
        }}
      </Submenu>
    )

    if (isFirstLevel.value) {
      return () => {
        return !hasChildren.value ? (
          <VToolTip item={menuItemData}>{{ default: meunItemFuc }}</VToolTip>
        ) : (
          <VMenusToolTip item={menuItemData}>{{ default: submenuItemFuc }}</VMenusToolTip>
        )
      }
    }

    return () => (!hasChildren.value ? meunItemFuc() : submenuItemFuc())
  },
})

export default RenderMenuItem
