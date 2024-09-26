/**
 * 获取顶部地址栏地址
 */
export const getTopUrl = () => {
  return window.location.href.split('/#/')[0]
}

//防抖，在一段时间内会执行一次，如果在这个时间段内再次触发，重新计算时间（用作提交事件，防止重复提交）
// export const debounce = (fn: () => void, delay: number) => {
//   let timer: any
//   return function () {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn()
//     }, delay)
//   }
// }

/**
 * 如果 inputChange 有 返回值，怎么拿到？
 *    思路一: 在 debounce函数 增加一个 resultCb 回调函数参数
 *    思路二: Promise
 *
 *    两者可以共存
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = false,
  resultCb?: (args: any | any[]) => void
) {
  // 1. timer: 定义一个 定时器, 保存 上一次的 定时器
  let timer: NodeJS.Timeout | null = null
  let isInvoke = false

  // 2. _debounce: 真正 执行的 函数
  const _debounce = function <T>(this: any, ...args: any) {
    return new Promise<T | boolean>((resolve) => {
      // 3. 取消 上一次的 定时器 ( 如果在 规定时间内 再次输入的 时候 要取消上一次的 延迟, 也就是 不让之前的 函数 去执行)
      if (timer) clearTimeout(timer)

      // 6. 判断 是否 需要 立即执行
      if (immediate && !isInvoke) {
        const res = typeof fn === 'function' && fn.apply(this, args)
        // 8. 外界拿到 fn 返回值
        if (resultCb) resultCb(res)
        resolve(res)
        isInvoke = true
      } else {
        // 4. 延迟执行
        timer = setTimeout(() => {
          // 5. fn: 外部传入的 真正 要执行的 函数
          // console.log("this====>", this);
          const res = fn.apply(this, args)
          // 8. 外界拿到 fn 返回值
          if (resultCb) resultCb(res)
          resolve(res)
          timer = null
          isInvoke = false
        }, delay)
      }
    })
  }

  // 7. 封装 取消功能
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}
