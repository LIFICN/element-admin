export type DataType = 'object' | 'formData'
export type ResponseType = 'text' | 'json' | 'blob' | 'arrayBuffer'
export type RequestInitExt = RequestInit & { data: any; dataType?: DataType; responseType?: ResponseType }

export interface RequestObj<T> {
  data: T
  method: string
  url: string
  headers?: Record<string, string>
  dataType?: DataType //object 或者 formData
  responseType?: ResponseType //text json blob arrayBuffer
}

export interface Interceptor {
  request?: (req: RequestInitExt) => RequestInitExt
  response?: (res: any) => any
  error?: (err: any) => any
}

//fetch拦截器
const interceptor: Interceptor = {
  request(req: RequestInitExt): RequestInitExt {
    if (!req.headers || !(req.headers as Record<string, string>)['Content-Type']) {
      req.headers = { 'Content-Type': 'application/json' }
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

const BaseUrl = '' //环境变量URL
const Timeout = 6000 //接口超时时间

export default function request({ data, method, url, headers, dataType, responseType }: RequestObj<any>): Promise<any> {
  return createFetch(BaseUrl + url, { data, method, headers, dataType, responseType }, interceptor, Timeout)
}

//创建fetch请求
const createFetch = (url: string, options: RequestInitExt, interceptor?: Interceptor, timeout?: number) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      options = interceptor?.request?.(options) || options
      options.dataType = options.dataType || 'object'
      options.responseType = options.responseType || 'json'
      options.method = options.method?.toUpperCase() || 'GET'
      options.data = options.data || {}

      //处理fetch请求参数
      const isObj = options.dataType === 'object'
      options.body = !isObj ? options.data : null

      if (options.method === 'GET' && isObj) {
        const keys = Object.keys(options.data)
        let searchStr: string = keys.length > 0 ? '?' + new URLSearchParams(options.data).toString() : ''
        url = url + searchStr
      }

      if (options.method !== 'GET' && isObj) {
        const contentType: string | null = (options.headers as { [key: string]: string })['Content-Type']
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
      const response: Response = await fetch(url, { ...options, credentials: 'include', signal }) //处理cookie

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
