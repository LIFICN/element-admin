import axios from 'axios'
import { getToken } from '@/utils/auth'

// http://www.axios-js.com/zh-cn/docs/
const instance = axios.create({
  baseURL: '',
  timeout: 3000,
})

instance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config!.headers!['X-Token'] = token
    return config
  },
  (error) => Promise.reject<any>(error)
)

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject<any>(error)
)

export default instance
