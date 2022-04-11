import router from '@/router'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store/user'
import { useRouteStore } from '@/store/route'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })
const whiteList: string[] = ['/login']

router.beforeEach(async (to, _, next) => {
  NProgress.start()

  const token = getToken()
  const userStore = useUserStore()
  const hasRole = Array.isArray(userStore.roleGetter) && userStore.roleGetter.length > 0

  if (whiteList.includes(to.path)) {
    next()
    return
  }

  if (!token) {
    next('/login')
    return
  }

  if (!hasRole) {
    const routeStore = useRouteStore()
    await userStore.getUserInfo()
    await routeStore.addRoutes([])
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

router.onError((err, to, from) => {
  console.log(err, to, from)
  NProgress.done()
})
