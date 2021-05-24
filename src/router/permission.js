import router from '@/router'
import { getToken } from '@/utils/auth.js'
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    const token = getToken()

    // document.title = to.meta.title || 'element-admin'

    if (whiteList.includes(to.path) || token) next()
    else next('/login')
})