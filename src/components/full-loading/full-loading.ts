import { createApp } from 'vue'
import FullLoadingCPN from '@/components/full-loading/full-loading-cpn.vue'
import { debounce } from '@/utils/common/debounce-or-throttle'

let loadingInstance: any

function hideDebounceFnCallback() {
  const dom = document.getElementById('loading')
  if (loadingInstance || dom) {
    document.body.removeChild(dom as HTMLElement)
    loadingInstance = null
  }
}
const hideDebounceFn = debounce(hideDebounceFnCallback, 450)

const LoadingService = {
  open(message = '加载中...') {
    if (!loadingInstance) {
      const loadingApp = createApp(FullLoadingCPN)
      const dom = document.createElement('div')
      dom.setAttribute('id', 'loading')
      document.body.appendChild(dom)
      loadingInstance = loadingApp.mount(dom)
      // console.log('loadingInstance ==>', loadingInstance)
      loadingInstance.open(message)
    }
  },
  async close() {
    await hideDebounceFn()
    // if (loadingInstance) {
    //   loadingInstance.close();
    // }
  }
}

export default LoadingService
