import { createStore } from 'vuex'
import { setToken, removeToken } from '@/utils/auth'
import { constantRoutes } from '@/router'
import router from '@/router'

let removeRoutesArr = []

//https://next.vuex.vuejs.org/zh/
const store = createStore({
    state: {
        routes: [],
        userInfo: {}
    },
    getters: {
        routes: state => state.routes,
        userInfo: state => state.userInfo,
        role: state => state.userInfo.role,
        username: state => state.userInfo.username
    },
    mutations: {
        setRoutes(state, routes) {
            state.routes = constantRoutes.concat(routes)
            routes.forEach(el => {
                const remove = router.addRoute(el)
                removeRoutesArr.push(remove)
            })
        },
        resetRoutes(state) {
            state.routes = []
            removeRoutesArr.forEach(el => el())
            removeRoutesArr = []
        },
        setUserInfo(state, info) {
            state.userInfo = info
        }
    },
    actions: {
        setRoutes(context, val) {
            return new Promise((resolve) => {
                context.commit('setRoutes', val)
                resolve()
            })
        },
        login(_, data) {
            return new Promise((resolve, reject) => {
                if (data.username != 'admin' || data.password != '123') {
                    reject('用户名或密码错误！')
                    return
                }

                setToken('element-admin')
                resolve()
            })
        },
        logout(context) {
            return new Promise((resolve, reject) => {
                try {
                    removeToken()
                    context.commit('resetRoutes')
                    context.commit('setUserInfo', {})
                    resolve()
                } catch (err) {
                    reject(err)
                }
            })
        },
        getUserInfo(context) {
            return new Promise((resolve) => {
                const info = { username: '超级管理员', role: 'admin' }
                context.commit('setUserInfo', info)
                resolve(info)
            })
        }
    }
})

export default store