import { createRouter, createWebHashHistory } from 'vue-router'
const routerHistory = createWebHashHistory()

const Layout = () => import('@/layout/index.vue')
const ParentView = () => import('@/layout/ParentView.vue')
const login = () => import('@/views/login/index.vue')
const dashboard = () => import('@/views/dashboard/index.vue')
const test = () => import('@/views/test/index.vue')
const table = () => import('@/views/table/index.vue')

//https://next.router.vuejs.org/zh/index.html
export const constantRoutes = [
  { path: '/', redirect: '/dashboard', hidden: true },
  { path: '/login', component: login, hidden: true },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: dashboard,
        meta: { title: 'dashboard', icon: 'Aim', affix: true }, //affix为是否固定选项卡
      },
    ],
  },
  {
    path: '/menus',
    component: Layout,
    meta: { title: 'menus', icon: 'AddLocation' },
    children: [
      {
        path: 'menu1',
        component: ParentView,
        meta: { title: 'menu1', icon: 'Apple' },
        children: [
          {
            path: 'menu1-1',
            component: ParentView,
            meta: { title: 'menu1-1', icon: 'AlarmClock' },
          },
          {
            path: 'menu1-2',
            component: ParentView,
            meta: { title: 'menu1-2', icon: 'Bell' },
          },
        ],
      },
      {
        path: 'test',
        component: test,
        meta: { title: 'test', icon: 'Baseball' },
      },
    ],
  },
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: '',
        component: table,
        meta: { title: 'tabel', icon: 'Bicycle' },
      },
    ],
  },
]

const router = createRouter({
  history: routerHistory,
  routes: constantRoutes,
})

export default router
