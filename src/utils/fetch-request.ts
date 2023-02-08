export type ResponseType = 'text' | 'json' | 'blob' | 'arrayBuffer'
export type RequestInitExt = RequestInit & { data: any; responseType?: ResponseType }

export interface RequestObj<T> {
  data: T
  method: string
  url: string
  headers?: Record<string, string>
  responseType?: ResponseType //text json blob arrayBuffer
  credentials?: RequestCredentials | undefined
  cache?: RequestCache
}

export interface Interceptor {
  request?: (req: RequestInitExt) => RequestInitExt
  response?: (res: any) => any
  error?: (err: any) => any
}

//fetch拦截器
const interceptor: Interceptor = {
  request(req: RequestInitExt): RequestInitExt {
    const headers = (req.headers || {}) as Record<string, string>

    if (!headers || !headers['Content-Type']) {
      req.headers = { 'Content-Type': 'application/json' }
    }

    if (req.responseType === 'blob') {
      req.headers = { ...req.headers, 'Content-Type': '' }
    }

    return req
  },
  response(res: any): any {
    return res
  },
  error(err: any) {
    return err
  },
}

const BaseUrl = process.env.REACT_APP_BASE_URL //环境变量URL
const Timeout = 6000 //接口超时时间

export default function request(obj: RequestObj<any>): Promise<any> {
  const { data, method, url, headers, responseType, credentials, cache } = obj
  const options: RequestInitExt = { data, method, headers, responseType, credentials, cache }
  return createFetch(!url.startsWith('http') ? BaseUrl + url : url, options, interceptor, Timeout)
}

//创建fetch请求
const createFetch = (url: string, options: RequestInitExt, interceptor?: Interceptor, timeout?: number) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      options = interceptor?.request?.(options) || options
      options.responseType = options.responseType || 'json'
      options.method = options.method?.toUpperCase() || 'GET'
      options.data = options.data || null
      options.credentials = options.credentials || 'same-origin' //处理是否携带cookie
      options.cache = options.cache || 'default' //处理缓存

      //处理fetch请求参数
      const isObj = Object.prototype.toString.call(options.data) === '[object Object]'
      const isArray = Object.prototype.toString.call(options.data) === '[object Array]'
      options.body = isObj || isArray || options.method === 'GET' ? null : options.data

      if (options.method === 'GET' && (isObj || isArray)) {
        const keys = Object.keys(options.data)
        let searchStr: string = keys.length > 0 ? '?' + new URLSearchParams(options.data).toString() : ''
        url = url + searchStr
      }

      if (options.method !== 'GET' && (isObj || isArray)) {
        const contentType: string | undefined = ((options.headers || {}) as { [key: string]: string })['Content-Type']
        if (contentType?.includes('application/json')) options.body = JSON.stringify(options.data)
        if (contentType?.includes('application/x-www-form-urlencoded')) options.body = new URLSearchParams(options.data)
      }

      //请求超时检测
      const timeoutCtl: AbortController = new AbortController()
      const signal = timeoutCtl.signal
      let timeId = setTimeout(() => {
        if (options.responseType === 'json' || options.responseType === 'text') timeoutCtl.abort()
      }, timeout || 6000)

      //执行fetch请求
      const response: Response = await fetch(url, { ...options, signal }) //处理cookie

      //处理fetch状态码不抛异常的问题
      if (response.status >= 300)
        throw new Error(`${response.url} status: ${response.status} reson: ${response.statusText}`)

      //处理fetch结果回调
      let responseVal: any = null
      if (options.responseType === 'json') responseVal = await response.json()
      else if (options.responseType === 'arrayBuffer') responseVal = await response.arrayBuffer()
      else if (options.responseType === 'text') responseVal = await response.text()
      else if (options.responseType === 'blob') responseVal = await response.blob()

      clearTimeout(timeId) //请求成功，移除超时检测
      resolve(interceptor?.response?.(responseVal) || responseVal)
    } catch (err) {
      reject(interceptor?.error?.(err) || err)
    }
  })
}
