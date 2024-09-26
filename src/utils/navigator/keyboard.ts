import { checkNavigator } from '@/utils/check/check-navigator'
import type { TypeNavigator } from '@/utils/check/check-navigator'

import { VToast } from '@/utils/custom-vant/v-toast'

export type TypeShowOrHiddenCallbackParams = {
  type: TypeNavigator
  currentScreenHeight: number
  // originalScrollTop: number
  // currentScrollTop: number
  originalInnerHeight: number
  currentInnerHeight: number

  currentKeyboardHeight: number
}

export interface ICallbackShowOrHidden {
  callbackShowAndroid?: (params?: TypeShowOrHiddenCallbackParams) => void
  callbackHiddenAndroid?: (params?: TypeShowOrHiddenCallbackParams) => void
  callbackShowIOS?: (params?: TypeShowOrHiddenCallbackParams) => void
  callbackHiddenIOS?: (params?: TypeShowOrHiddenCallbackParams) => void
}

interface IKeyboard {
  readonly type: TypeNavigator
  name: '刚进页面' | '抬起' | '隐藏'

  readonly originalScreenHeight: number // 原始屏幕  高度
  currentScreenHeight: number // 当前屏幕 高度

  // readonly originalScrollTop: number // 原始屏幕 滚动 top 0
  // currentScrollTop: number // 当前屏幕 滚动 top

  currentKeyboardHeight: number

  readonly originalInnerHeight: number
  currentInnerHeight: number

  callbackShowOrHidden?: ICallbackShowOrHidden //  键盘 弹起 隐藏 传入回调

  setCurrentInfo: () => void // 设置 当前 信息
  getCurrentInfo: () => TypeShowOrHiddenCallbackParams // 拿到 当前 信息
  logCurrentInfo: (name: '刚进页面' | '抬起' | '隐藏') => void // 打印当前信息日志

  start: (params?: ICallbackShowOrHidden) => void
  end: () => void

  onResize: () => void // Android 监听 resize 事件
  onFocusin: () => void // iOS 监听 获取焦点 事件（键盘抬起）
  onFocusout: () => void // iOS 监听 失去焦点 事件（键盘收起）
}

class Keyboard implements IKeyboard {
  readonly type: TypeNavigator
  name: '刚进页面' | '抬起' | '隐藏'
  readonly originalScreenHeight: number
  currentScreenHeight: number

  // readonly originalScrollTop: number
  // currentScrollTop: number
  currentKeyboardHeight: number

  readonly originalInnerHeight: number
  currentInnerHeight: number

  callbackShowOrHidden?: ICallbackShowOrHidden

  constructor() {
    this.type = checkNavigator()
    this.name = '隐藏'

    this.originalScreenHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.currentScreenHeight = this.originalScreenHeight
    // 当前键盘高度
    // this.originalScrollTop =
    //   document.documentElement.scrollTop || document.body.scrollTop
    // this.currentScrollTop = this.originalScrollTop

    this.originalInnerHeight = window.innerHeight
    this.currentInnerHeight = this.originalInnerHeight

    this.currentKeyboardHeight = this.currentScreenHeight - this.currentInnerHeight

    // this.logCurrentInfo('刚进页面')
  }

  setCurrentInfo() {
    this.currentScreenHeight = document.documentElement.clientHeight || document.body.clientHeight
    // this.currentScrollTop =
    //   document.documentElement.scrollTop || document.body.scrollTop
    this.currentInnerHeight = window.innerHeight

    this.currentKeyboardHeight = this.currentScreenHeight - this.currentInnerHeight
  }

  getCurrentInfo(): TypeShowOrHiddenCallbackParams {
    return {
      type: this.type,
      currentScreenHeight: this.currentScreenHeight,
      // originalScrollTop: this.originalScrollTop,
      // currentScrollTop: this.currentScrollTop,
      originalInnerHeight: this.originalInnerHeight,
      currentInnerHeight: this.currentInnerHeight,
      currentKeyboardHeight: this.currentKeyboardHeight
    }
  }

  logCurrentInfo(name: '刚进页面' | '抬起' | '隐藏') {
    this.name = name
    const info = this.getCurrentInfo()
    const lineSymbol = '\n'
    const message = `
    版本8-键盘事件-${this.name}${lineSymbol}
    屏幕-高度：${info.currentScreenHeight}--键盘-高度：${info.currentKeyboardHeight}${lineSymbol}
    innerHeight：${info.currentInnerHeight}--html-高度-${document.documentElement.offsetHeight}`

    VToast.show(message)
  }

  start(params?: ICallbackShowOrHidden): void {
    this.callbackShowOrHidden = params

    if (this.type === 'Android') {
      window.addEventListener('resize', this.onResize)
    }

    if (this.type === 'IOS') {
      // //passive默认为true，不写也可以，如果将其设置为true 那么e.preventDefault()就不会生效。
      // document.addEventListener('touchstart', this.preventDefault, {
      //   passive: false
      // })
      document.addEventListener('touchmove', this.preventDefault, {
        passive: false
      })

      // iOS系统 键盘抬起
      window.addEventListener('focusin', this.onFocusin)
      // iOS系统 隐藏
      window.addEventListener('focusout', this.onFocusout)
    }
  }

  end(): void {
    console.log('銷毀')
    if (this.type === 'Android') {
      //获取窗口的高度
      window.removeEventListener('resize', this.onResize)
    }

    if (this.type === 'IOS') {
      // document.removeEventListener('touchstart', this.preventDefault)
      document.removeEventListener('touchmove', this.preventDefault)
      window.removeEventListener('focusin', this.onFocusin)
      window.removeEventListener('focusout', this.onFocusout)
      document.documentElement.style.height = `100%`
    }
  }

  // Android 监听 resize 事件
  onResize = () => {
    // 键盘 弹起 与 隐藏 都会引起 窗口的 高度 发生变化
    this.setCurrentInfo()
    const calcHeight = this.originalScreenHeight - this.currentScreenHeight

    if (calcHeight > 50) {
      // this.logCurrentInfo('抬起')
      this.callbackShowOrHidden?.callbackShowAndroid && this.callbackShowOrHidden?.callbackShowAndroid(this.getCurrentInfo())
    } else {
      // this.logCurrentInfo('隐藏')
      this.callbackShowOrHidden?.callbackHiddenAndroid && this.callbackShowOrHidden?.callbackHiddenAndroid(this.getCurrentInfo())
    }
  }

  // iOS 监听 获取焦点 事件（键盘抬起）
  onFocusin = () => {
    setTimeout(() => {
      document.body.scrollIntoView(true)
      this.setCurrentInfo()

      document.documentElement.style.height = `${this.getCurrentInfo().currentInnerHeight}px`

      // this.logCurrentInfo('抬起')

      this.callbackShowOrHidden?.callbackShowIOS && this.callbackShowOrHidden?.callbackShowIOS()
    }, 100)
  }
  preventDefault(e: Event) {
    e.preventDefault()
  }
  // iOS 监听 失去焦点 事件（键盘收起）
  onFocusout = () => {
    this.setCurrentInfo()

    document.documentElement.style.height = `${this.getCurrentInfo().currentInnerHeight}px`
    // this.logCurrentInfo('隐藏')

    window.scrollTo(0, 0) // 失去 焦点时 回滚
    document.body.scrollIntoView()

    this.callbackShowOrHidden?.callbackHiddenIOS && this.callbackShowOrHidden?.callbackHiddenIOS()
  }
}

export default Keyboard
