import { defineStore } from 'pinia'
import router, { RouteRecordRawExt, constantRoutes } from '@/router'

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
        this.routes = constantRoutes.concat(routes)
        routes.forEach((el) => {
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
