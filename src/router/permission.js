import router from '@/router'
import { getToken } from '@/utils/auth.js'
import store from '@/store'
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    const token = getToken()
    const routes = store.getters.routes || []

    if (whiteList.includes(to.path)) {
        next()
        return
    }

    if (!token) {
        next('/login')
        return
    }

    if (!routes || routes.length <= 0) {
        store.dispatch('setRoutes', [])
    }

    next()
})