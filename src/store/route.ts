import { defineStore } from 'pinia'
import router, { RouteRecordRawExt, constantRoutes, asyncRoutes } from '@/router'

let removeRoutesArr: Function[] = []

export const useRouteStore = defineStore('router', {
  state: () => ({
    routes: [] as RouteRecordRawExt[],
  }),
  getters: {
    routesGetter: (state): RouteRecordRawExt[] => state.routes,
  },
  actions: {
    addRoutes(routes: RouteRecordRawExt[]): Promise<void> {
      return new Promise<void>((resolve, _) => {
        const addRouteList = [...routes, ...asyncRoutes]
        this.routes = constantRoutes.concat(addRouteList)

        addRouteList.forEach((el) => {
          const remove = router.addRoute(el)
          removeRoutesArr.push(remove)
        })

        resolve()
      })
    },
    resetRoutes(): void {
      this.routes = []
      removeRoutesArr.forEach((el) => el())
      removeRoutesArr = []
    },
  },
})
