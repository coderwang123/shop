export type TypeCheckLine = {
  newValue: string
  oldValue: string
  callbackLine?: () => void
  callbackNoLine?: () => void
}
export default function checkLine(params: TypeCheckLine) {
  console.log('newValue ====> ', params.newValue)
  const regOld = /[\r\n]+/g.test(params.newValue)
  const regNew = /[\r\n]+/g.test(params.oldValue)
  console.log('regOld ====> ', regOld)
  console.log('regNew ====> ', regNew)
  if (regOld || regNew) {
    console.log('发生了换行操作')
    params.callbackLine && params.callbackLine()
  } else {
    console.log('没有发生换行操作')
    params.callbackNoLine && params.callbackNoLine()
  }
}
