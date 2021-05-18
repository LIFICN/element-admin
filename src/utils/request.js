import axios from 'axios'

// http://www.axios-js.com/zh-cn/docs/
const instance = axios.create({
  baseURL: '',
  timeout: 3000
})

instance.interceptors.request.use(
  config => {
    if (store.getters.token)
      config.headers['X-Token'] = ''

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance