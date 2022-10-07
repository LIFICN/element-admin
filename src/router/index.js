import { createRouter, createWebHashHistory } from 'vue-router'
const routerHistory = createWebHashHistory()

const Layout = () => import('@/layout/index.vue')
const ParentView = () => import('@/layout/ParentView.vue')
const ErrorPage = () => import('@/views/error-page/index.vue')
const Login = () => import('@/views/login/index.vue')
const Dashboard = () => import('@/views/dashboard/index.vue')
const Test = () => import('@/views/test/index.vue')
const Table = () => import('@/views/table/index.vue')

//https://next.router.vuejs.org/zh/index.html
export const constantRoutes = [
  { path: '/', redirect: '/dashboard', hidden: true },
  { path: '/login', component: Login, hidden: true },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: Dashboard,
        meta: { title: 'dashboard', icon: 'AimIcon', affix: true }, //affix为是否固定选项卡
      },
    ],
  },
  {
    path: '/menus',
    component: Layout,
    meta: { title: 'menus', icon: 'AddLocationIcon' },
    children: [
      {
        path: 'menu1',
        component: ParentView,
        meta: { title: 'menu1', icon: 'AppleIcon' },
        children: [
          {
            path: 'menu1-1',
            component: ParentView,
            meta: { title: 'menu1-1', icon: 'AlarmClockIcon' },
          },
          {
            path: 'menu1-2',
            component: ParentView,
            meta: { title: 'menu1-2', icon: 'BellIcon' },
          },
        ],
      },
      {
        path: 'test',
        component: Test,
        meta: { title: 'test', icon: 'BaseballIcon' },
      },
    ],
  },
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: '',
        component: Table,
        meta: { title: 'tabel', icon: 'BicycleIcon' },
      },
    ],
  },
]

export const asyncRoutes = [
  {
    path: '/404',
    hidden: true,
    component: ErrorPage,
    meta: { title: '404' },
  },

  // 404 page must be placed at the end !!!
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
  },
]

const router = createRouter({
  history: routerHistory,
  routes: constantRoutes,
})

export default router
