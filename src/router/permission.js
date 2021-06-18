import router from '@/router'
import { getToken } from '@/utils/auth.js'
import store from '@/store'
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    const token = getToken()
    const role = store.getters.role || ''

    if (whiteList.includes(to.path)) {
        next()
        return
    }

    if (!token) {
        next('/login')
        return
    }

    if (!role) {
        await store.dispatch('getUserInfo')
        await store.dispatch('setRoutes', [])
    }

    next()
})