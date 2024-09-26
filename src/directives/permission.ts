import type { App } from 'vue'
import { localCache } from '@/utils/common/cache'
import { USER_BUTTONS } from '@/global/constants'
export default function directivePermission(app: App<Element>) {
  app.directive('permission', {
    mounted(el, bindings) {
      const userButtons = localCache.getCache(USER_BUTTONS)
      // value 获取用户使用自定义指令绑定的内容
      const { value } = bindings

      if (value && value instanceof Array && value.length > 0) {
        const currentBtns = value
        const hasPermission = userButtons.some((item: any) =>
          currentBtns.includes(item)
        )
        console.log('hasPermission', hasPermission)
        if (!hasPermission) {
          el.style.display = 'none'
        }
      }
    }
  })
}
