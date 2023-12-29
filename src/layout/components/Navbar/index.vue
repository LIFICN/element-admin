<template>
  <div class="nav-bar">
    <div class="right-slot">
      <el-dropdown>
        <el-icon class="setting-icon">
          <SettingIcon />
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

<script setup>
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

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
  justify-content: flex-end;
  align-items: center;
  color: #333;
  border: 1px solid #f6f6f6;

  .right-slot {
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
