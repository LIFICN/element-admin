import { createRouter, createWebHashHistory } from 'vue-router'
const routerHistory = createWebHashHistory()

const layout = () => import('@/layout/index.vue')
const ParentView = () => import('@/layout/ParentView.vue')
const login = () => import('@/views/login/index.vue')
const dashboard = () => import('@/views/dashboard/index.vue')
const test = () => import('@/views/test/index.vue')
const table = () => import('@/views/table/index.vue')

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
            component: ParentView,
            meta: { title: 'menu1', icon: '' },
            children: [
                {
                    path: 'menu1-1',
                    component: ParentView,
                    meta: { title: 'menu1-1', icon: '' },
                },
                {
                    path: 'menu1-2',
                    component: ParentView,
                    meta: { title: 'menu1-2', icon: '' },
                },
            ]
        },
        {
            path: 'test',
            component: test,
            meta: { title: 'test', icon: '' },
        }]
    },
    {
        path: '/table',
        component: layout,
        children: [{
            path: '',
            component: table,
            meta: { title: 'tabel', icon: '' },
        }]
    }
]

const router = createRouter({
    history: routerHistory,
    routes: constantRoutes,
})

export default router
