import { onMounted, ref } from 'vue'
import { useKeyboard } from '@/hooks/use-keyboard'
// import type { TypeShowOrHiddenCallbackParams } from '@/utils/navigator/keyboard'

export const isShowTabBar = ref(true)
export default function useHiddenTabBar() {
  onMounted(() => {
    activeClass.value = originalClass
  })
  const originalClass = {
    padding: '44px 0 56px'
  }
  const newClass = {
    padding: '44px 0 0'
  }
  // const originalPadding: string = '44px 0 56px'
  // const newPadding: string = '44px 0 0'
  const activeClass = ref(originalClass)

  useKeyboard({
    callbackShowAndroid: () => callbackShowAndroid(),
    callbackHiddenAndroid: () => callbackHiddenAndroid(),
    callbackShowIOS: () => callbackShowIOS(),
    callbackHiddenIOS: () => callbackHiddenIOS()
  })

  function callbackShowAndroid() {
    commonShow()
  }

  function callbackHiddenAndroid() {
    commonHidden()
  }

  function callbackShowIOS() {
    commonShow()
  }

  function callbackHiddenIOS() {
    commonHidden()
  }

  function commonShow() {
    isShowTabBar.value = false
    activeClass.value = newClass
    console.log('isShowTabBar ===> ', isShowTabBar.value)
  }

  function commonHidden() {
    isShowTabBar.value = true
    activeClass.value = originalClass
    console.log('isShowTabBar ===> ', isShowTabBar.value)
  }
  console.log('activeClass', activeClass)
  return {
    activeClass
  }
}
