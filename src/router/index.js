import { createRouter, createWebHashHistory } from 'vue-router'
const routerHistory = createWebHashHistory()

const layout = () => import('@/layout/index.vue')
const parentView = () => import('@/layout/parent-view.vue')
const dashboard = () => import('@/views/dashboard/index.vue')
const test = () => import('@/views/test/index.vue')
const login = () => import('@/views/login/index.vue')

//https://next.router.vuejs.org/zh/index.html
export const constantRoutes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: login, hidden: true },
    {
        path: '/dashboard',
        component: layout,
        children: [{
            path: '',
            component: dashboard,
            meta: { title: 'dashboard', icon: 'el-icon-location', affix: true } //affix为是否固定选项卡
        }]
    },
    {
        path: '/menus',
        component: layout,
        meta: { title: 'menus', icon: 'el-icon-setting' },
        children: [{
            path: 'menu1',
            component: parentView,
            meta: { title: 'menu1', icon: '' },
            children: [
                {
                    path: 'menu1-1',
                    component: parentView,
                    meta: { title: 'menu1-1', icon: '' },
                },
                {
                    path: 'menu1-2',
                    component: parentView,
                    meta: { title: 'menu1-2', icon: '' },
                },
            ]
        },
        {
            path: 'test',
            component: test,
            meta: { title: 'test', icon: '' },
        }]
    }
]

const router = createRouter({
    history: routerHistory,
    routes: constantRoutes,
})

export default router
