import { createApp } from 'vue'
import 'normalize.css'
import './assets/styles/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'

// 工具
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const app = createApp(App)
function initApp() {
  app.use(store)
  app.use(directives)
  app.use(router)

  // if (import.meta.env.DEV) {
  //   // 测试和开发打开，生产不能打开
  // const vConsole = new Vconsole()
  // app.use(vConsole)
  // }
  app.mount('#main-app')
}
initApp()
