import { ref, onMounted, nextTick } from 'vue'

import { debounce } from '@/utils/common/debounce-or-throttle'
import type { TypeShowOrHiddenCallbackParams } from '@/utils/navigator/keyboard'
import { useKeyboard } from '@/hooks/use-keyboard'
import type { TypeNavigator } from '@/utils/check/check-navigator'

interface IChatHeightProps {
  handleScrollToCallback: () => void
  classNameListFixed?: Array<string>
  classNameListDynamic?: Array<string>
}
// 安卓 内容区域 = 视口 - 导航 - 输入框
export default function userScrollContentHeight(props: IChatHeightProps) {
  onMounted(async () => {
    await init()
  })

  const currentScreenHeight = ref(0) // 当前 视口高度 px

  const scrollContentHeightValue = ref(0) // 滚动content 高度 px

  const isShowKey = ref(false) // 键盘是否 弹起 true / 关闭 false

  let totalFixedHeight = 0
  let totalDynamicHeight = 0
  const currentInnerHeight = ref(0)
  const typeNavigator = ref<TypeNavigator>('Android')
  const { keyboard } = useKeyboard({
    callbackShowAndroid: async (params) => await callbackShowAndroid(params),
    callbackHiddenAndroid: async (params) =>
      await callbackHiddenAndroid(params),
    callbackShowIOS: async (params) => await callbackShowIOS(params),
    callbackHiddenIOS: async (params) => await callbackHiddenIOS(params)
  })

  currentScreenHeight.value = keyboard.getCurrentInfo().currentScreenHeight
  // 安卓键盘 弹出 回调
  async function callbackShowAndroid(params: TypeShowOrHiddenCallbackParams) {
    typeNavigator.value = params.type
    isShowKey.value = true

    currentScreenHeight.value = params.currentScreenHeight

    await calcContentHeight()
  }

  // 安卓键盘 隐藏 回调
  async function callbackHiddenAndroid(params: TypeShowOrHiddenCallbackParams) {
    typeNavigator.value = params.type
    isShowKey.value = false

    currentScreenHeight.value = params.currentScreenHeight

    await calcContentHeight()
  }

  // ios键盘 弹出 回调
  async function callbackShowIOS(params: TypeShowOrHiddenCallbackParams) {
    typeNavigator.value = params.type
    isShowKey.value = true

    currentInnerHeight.value = params.currentInnerHeight

    currentScreenHeight.value = params.currentScreenHeight

    await calcContentHeight()
  }
  // ios键盘 隐藏 回调
  async function callbackHiddenIOS(params: TypeShowOrHiddenCallbackParams) {
    typeNavigator.value = params.type
    isShowKey.value = false

    currentInnerHeight.value = params.currentInnerHeight

    currentScreenHeight.value = params.currentScreenHeight

    await calcContentHeight()
  }

  // 初始化
  async function init() {
    // 计算一遍 固定 高度
    calcFixedHeight()

    // 计算 滚动内容 高度, 此时 键盘无抬起（刚进来）
    await calcContentHeight()
  }

  // 计算 固定元素 高度
  function calcFixedHeight() {
    if (props.classNameListFixed) {
      props.classNameListFixed.forEach((className: string) => {
        const el = document.querySelector(className)
        totalFixedHeight += (el as any)!.offsetHeight
      })
    }

    console.log('totalFixedHeight  ====> ', totalFixedHeight)
  }

  // 计算 动态元素 高度
  function calcDynamicHeight() {
    totalDynamicHeight = 0
    if (props.classNameListDynamic) {
      props.classNameListDynamic.forEach((className: string) => {
        const el = document.querySelector(className)
        totalDynamicHeight += (el as any)!.offsetHeight
      })
    }

    console.log('totalDynamicHeight  ====> ', totalDynamicHeight)
  }

  // 计算 滚动内容 高度
  async function calcContentHeight() {
    // 先计算动态 高度
    calcDynamicHeight()
    if (typeNavigator.value === 'Android') {
      scrollContentHeightValue.value =
        currentScreenHeight.value - totalFixedHeight - totalDynamicHeight
    }

    if (typeNavigator.value === 'IOS') {
      scrollContentHeightValue.value =
        currentInnerHeight.value - totalFixedHeight - totalDynamicHeight
    }

    await nextTick()

    props.handleScrollToCallback()
  }

  // 重设 计算 高度
  const refreshCalcHeight = debounce(calcContentHeight, 500)

  return {
    scrollContentHeightValue,
    refreshCalcHeight
  }
}
