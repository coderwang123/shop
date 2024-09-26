// 流下载方法
import { formatTime } from '@/utils/common/format'
function getFileName(fileName: string) {
  let newFileName = ''
  const data = formatTime(new Date())
  newFileName = fileName
    ? `${fileName}${data}`
    : new Date().getTime().toString()
  return newFileName
}

export function downloadByStream(res: any, fileName: string) {
  const url = window.URL.createObjectURL(
    new Blob([res], {
      type: 'application/vnd.ms-excel'
    })
  )
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', `${getFileName(fileName)}.xls`) // 第二个参数是自定义的名字,根据自己需要, 特别注意一下，苹果本上这个下载下来是没有后缀名的，但是可以打开，如果需要就带着后缀名.xsl。
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
