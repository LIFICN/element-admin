import { createRouter, createWebHashHistory } from 'vue-router'
const routerHistory = createWebHashHistory()

import helloWorld from '@/pages/HelloWorld.vue'

const routes = [
    { path: '/', component: helloWorld },
]

const router = createRouter({
    history: routerHistory,
    routes,
})

export default router
