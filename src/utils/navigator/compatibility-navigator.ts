import { checkNavigator } from '@/utils/check/check-navigator'

export function handleNoBackPage(callback: () => void) {
  if (checkNavigator()) {
    window.scrollTo(0, 0)
    if (callback) callback()
  }
}
