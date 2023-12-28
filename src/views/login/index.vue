<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <el-icon class="login-icon">
          <UserIcon />
        </el-icon>

        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-icon class="login-icon">
          <LockIcon />
        </el-icon>

        <el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter="handleLogin"
          :show-password="true"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        size="large"
      >
        Login
      </el-button>

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: 123</span>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter()

const validateUsername = (rule, value, callback) => {
  if (!value) callback(new Error('请输入用户名'))
  else callback()
}

const validatePassword = (rule, value, callback) => {
  if (!value) callback(new Error('请输入密码'))
  else callback()
}

const loginFormRef = ref('')
const loading = ref(false)

const loginForm = reactive({
  username: 'admin',
  password: '123',
})

const loginRules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
})

const handleLogin = function () {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true

      store
        .login(loginForm)
        .then((res) => {
          router.replace({ path: '/' })
          loading.value = false
        })
        .catch((err) => {
          loading.value = false
          alert(err)
        })

      return
    }

    console.log('error submit!!')
    return false
  })
}
</script>

<style lang="scss" scoped>
$bg: #283443;
$cursor: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .login-icon {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 18px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  :deep() {
    .el-input {
      height: 47px;
      width: 85%;
      overflow: hidden;

      .el-input__wrapper {
        box-shadow: none;
        background-color: transparent;

        input {
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;

          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
}
</style>
