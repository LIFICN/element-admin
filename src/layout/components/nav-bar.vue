<template>
  <div class="nav-bar">
    <span :class="{ 'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse }" @click="menuCollapse"></span>

    <div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 8px; font-size: 16px"></i>
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

export default {
  setup(_, { emit }) {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      isCollapse: false,
      username: computed(() => store.getters.username),
      menuCollapse() {
        const flag = !state.isCollapse
        state.isCollapse = flag
        emit('menuCollapse', flag)
      },
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

<style lang="scss">
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
  }
}
</style>