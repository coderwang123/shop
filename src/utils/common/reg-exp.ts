export function checkCh(str: string) {
  const regExp = new RegExp('[\\u4E00-\\u9FFF]', 'g')
  return regExp.test(str)
}
