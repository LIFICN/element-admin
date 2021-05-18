import { createRouter, createWebHashHistory } from 'vue-router'
const routerHistory = createWebHashHistory()

const layout = () => import('@/layout/index.vue')
const dashboard = () => import('@/views/dashboard/index.vue')
const test = () => import('@/views/test/index.vue')

//https://next.router.vuejs.org/zh/index.html
const routes = [
    { path: '/', redirect: '/dashboard' },
    {
        path: '/test',
        component: layout,
        children: [{
            path: '',
            component: test
        }]
    },
    {
        path: '/dashboard',
        component: layout,
        children: [{
            path: '',
            component: dashboard
        }]
    }
]

const router = createRouter({
    history: routerHistory,
    routes,
})

export default router
