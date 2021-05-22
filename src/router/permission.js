import router from '@/router'
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    // document.title = to.meta.title || 'element-admin'

    if (whiteList.includes(to.path) || token) next()
    else next('/login')
})