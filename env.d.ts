/// <reference types="vite/client" />
/// <reference types="vite/client" />

// 类型声明

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.mjs'
declare global {
  interface Window {
    clientHeight: any
  }
}
declare namespace NodeJS {
  type Timeout = any
}
