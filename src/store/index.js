import { createStore } from 'vuex'
import { setToken, removeToken } from '@/utils/auth'
import { constantRoutes } from '@/router'
import router from '@/router'

const removeRoutesCallback = []

//https://next.vuex.vuejs.org/zh/
const store = createStore({
    state: {
        routes: []
    },
    getters: {
        routes: state => state.routes
    },
    mutations: {
        setRoutes(state, routes) {
            state.routes = constantRoutes.concat(routes)
            routes.forEach(el => {
                const remove = router.addRoute(el)
                removeRoutesCallback.push(remove)
            })
        },
        resetRoutes(state) {
            state.routes = []
            removeRoutesCallback.forEach(el => el())
        }
    },
    actions: {
        setRoutes(context, val) {
            context.commit('setRoutes', val)
        },
        login(context, data) {
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
                    resolve()
                } catch (err) {
                    reject(err)
                }
            })
        }
    }
})

export default store