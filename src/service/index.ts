import { DT_ACCESS_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/common/cache'
import { BASE_URL, TIME_OUT } from './config'
import MyRequest from './request'
import website from '@/service/config/website'
import { Base64 } from 'js-base64'

const RequestService = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      if (config && config.headers) {
        config.headers['Authorization'] = `Basic ${Base64.encode(
          `${website.clientId}:${website.clientSecret}`
        )}`
      }

      // 每一个请求都自动携带token
      const dt_access_token = localCache.getCache(DT_ACCESS_TOKEN)
      if (config.headers && dt_access_token) {
        // 类型缩小
        config.headers['Openx-Auth'] = `bearer ${dt_access_token}`
      }
      return config
    }
  }
})

export default RequestService
