import router from '@/router'
import { getToken } from '@/utils/auth'
import store from '@/store'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']

router.beforeEach(async (to, _, next) => {
    NProgress.start()

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

router.afterEach(() => {
    NProgress.done()
})

router.onError((err, to, from) => {
    console.log(err, to, from)
    NProgress.done()
})