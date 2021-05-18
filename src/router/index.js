import { createRouter, createWebHashHistory } from 'vue-router'
const routerHistory = createWebHashHistory()

const indexPage = () => import('@/views/index.vue')

//https://next.router.vuejs.org/zh/index.html
const routes = [
    { path: '/', redirect: '/index' },
    { path: '/index', component: indexPage },
]

const router = createRouter({
    history: routerHistory,
    routes,
})

export default router
