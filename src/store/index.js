import { createStore } from 'vuex'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

//https://next.vuex.vuejs.org/zh/
const store = createStore({
    state: {
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
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
                removeToken()
                resetRouter()
                resolve()
            })
        }
    }
})

export default store