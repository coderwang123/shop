// 判断机型
export type TypeNavigator = 'Android' | 'IOS' | 'no'
export function checkNavigator(): TypeNavigator {
  const userAgent = navigator.userAgent
  const isAndroid =
    userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // 判断是否是安卓系统
  const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 判断是否是iOS系统

  if (isAndroid) {
    console.log('This is an Android device')
    return 'Android'
  } else if (isIOS) {
    console.log('This is an iOS device')
    return 'IOS'
  } else {
    console.log('This device is neither Android nor iOS')
    return 'no'
  }
}
