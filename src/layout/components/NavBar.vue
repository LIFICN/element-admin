<template>
  <div class="nav-bar">
    <el-icon @click="menuCollapse">
      <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
    </el-icon>

    <div>
      <el-dropdown>
        <el-icon class="setting-icon">
          <Setting />
        </el-icon>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>{{ username }}</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Fold, Expand, Setting } from '@element-plus/icons'

export default {
  components: {
    Fold,
    Expand,
    Setting,
  },
  emits: ['update:isCollapse'],
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const { isCollapse } = toRefs(props)

    const state = reactive({
      username: computed(() => store.getters.username),
      menuCollapse: () => emit('update:isCollapse', !isCollapse.value),
      logout() {
        store.dispatch('logout').then(() => {
          router.replace('/login')
        })
      },
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="scss" scoped>
$appHeaderHeight: 50px;
$appHeaderBg: #ffffff;

.nav-bar {
  height: $appHeaderHeight;
  width: 100%;
  background-color: $appHeaderBg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  border: 1px solid #f6f6f6;

  > :first-child {
    margin-left: 20px;
    font-size: 22px;
    cursor: pointer;
  }

  > :last-child {
    margin-right: 20px;
    font-size: 16px;

    .setting-icon {
      margin-right: 8px;
      font-size: 16px;
      vertical-align: bottom;
    }
  }
}
</style>