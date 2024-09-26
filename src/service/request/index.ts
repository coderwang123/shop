import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig } from './type'
import { showFailToast } from 'vant'
import fullLoading from '@/components/full-loading/full-loading.ts'

class MyRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      config => {
        // console.log('全局请求成功的拦截 ===> config', config)
        fullLoading?.open?.()
        return config
      },
      err => {
        // console.log('全局请求失败的拦截 ===> err', err)
        fullLoading?.close?.()
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        fullLoading?.close?.()
        console.log('>>>>res', res)

        const { status, data } = res
        const message = data.msg || data?.msg || data.message
        if (status == 200) {
          return res.data
        } else {
          showFailToast(message)
          return Promise.reject(message)
        }
      },
      err => {
        fullLoading?.close?.()
        const { status, data } = err?.response ?? {}
        if (!status) return showFailToast('连接超时，请稍后尝试~')
        if (status != 200) {
          const message = data.msg || err?.msg || err.message

          showFailToast(message)
          return Promise.reject(message)
        }
        return err
      }
    )

    // 针对特定的Request实例添加拦截器
    this.instance.interceptors.request.use(config.interceptors?.requestSuccessFn, config.interceptors?.requestFailureFn)

    // 针对特定的response实例添加拦截器
    this.instance.interceptors.response.use(config.interceptors?.responseSuccessFn, config.interceptors?.responseFailureFn)
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: RequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config?.interceptors?.responseSuccessFn) {
            res = config?.interceptors?.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
