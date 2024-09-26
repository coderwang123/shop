import Keyboard from '@/utils/navigator/keyboard'
import type { ICallbackShowOrHidden } from '@/utils/navigator/keyboard'
import { onBeforeUnmount } from 'vue'

export function useKeyboard(params: ICallbackShowOrHidden) {
  onBeforeUnmount(() => {
    keyboard.end()
  })

  const keyboard = new Keyboard()

  keyboard.start(params)

  return {
    keyboard
  }
}
