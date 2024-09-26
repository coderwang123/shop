import type { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

async function registerStore(app: App<Element>) {
  // 1.use 的 pinia
  app.use(pinia)
}

export default registerStore
