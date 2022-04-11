import { defineStore } from 'pinia'
import { setToken, removeToken } from '@/utils/auth'
import { useRouteStore } from './route'

export interface UserInfo {
  username: string
  role: string[]
}

export const useUserStore = defineStore('user', {
  state: () => ({
    role: [] as string[],
    username: '',
  }),
  getters: {
    roleGetter: (state): string[] => state.role,
    usernameGetter: (state): string => state.username,
  },
  actions: {
    changeUserInfo(obj: UserInfo) {
      this.username = obj['username']
      this.role = obj['role'] || []
    },
    login(data: any): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        if (data.username != 'admin' || data.password != '123') {
          reject('用户名或密码错误！')
          return
        }

        setToken('element-admin')
        resolve()
      })
    },
    logout(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        try {
          const stroe = useRouteStore()
          stroe.resetRoutes()
          removeToken()
          this.$reset()
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
    getUserInfo(): Promise<UserInfo> {
      return new Promise<UserInfo>((resolve) => {
        const info: UserInfo = { username: '超级管理员', role: ['admin'] }
        this.changeUserInfo(info)
        resolve(info)
      })
    },
  },
})
