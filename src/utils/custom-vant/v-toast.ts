import { showToast } from 'vant'
import 'vant/es/toast/style'

class VToast {
  static show(message: string) {
    showToast(message)
  }
}
const vToast = new VToast()
export { VToast }
export default vToast
