<template>
  <div class="nav-bar">
    <el-icon @click="menuCollapse">
      <component :is="isCollapse ? Expand : Fold"></component>
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
      <span>{{ store.usernameGetter }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { Fold, Expand, Setting } from '@element-plus/icons-vue'

const emits = defineEmits(['update:isCollapse'])

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const store = useUserStore()
const router = useRouter()
const { isCollapse } = toRefs(props)

const menuCollapse = () => emits('update:isCollapse', !isCollapse.value)

function logout() {
  store.logout().then(() => {
    router.replace('/login')
  })
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
    display: flex;
    align-items: center;

    .setting-icon {
      margin-right: 8px;
      font-size: 16px;
      vertical-align: middle;
    }
  }
}
</style>