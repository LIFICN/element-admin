import { createStore } from 'vuex'

//https://next.vuex.vuejs.org/zh/
const store = createStore({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    }
})

export default store