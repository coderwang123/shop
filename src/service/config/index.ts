// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
console.log(import.meta.env)

// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  if (import.meta.env.MODE == 'test') {
    BASE_URL = 'https://itunes.apple.com/dev-api'
  } else if (import.meta.env.MODE == 'build') {
    BASE_URL = 'https://itunes.apple.com/dev-api'
  }
  // 生产环境
} else {
  // 开发环境
  BASE_URL = '/dev-api'
}

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 300000
export { BASE_URL }
