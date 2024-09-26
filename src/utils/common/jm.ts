/**
 * 姓名
 * @param name
 * @returns 隐藏姓名中的第一个字，如为英文等其他语种，也是隐藏第一个字母。如：*大友、*安、*ahn（单位名称无需做脱敏处理）
 */
export function jmName(name: string) {
  if (!name || name.length < 2) return '-'
  let newName = ''
  if (name.length >= 2) {
    for (let i = 1; i < name.length; i++) {
      newName += name[i]
    }
    return `*${newName}`
  }
}

/**
 * 1.强隐藏规则：
 * @param idCard 身份证号
 * @returns 显示前1位和后1位，其它用*号代替。（凡是页面显示后无需用户检查确认的，使用这个规则。）示例：3****************X
 */
export function jmIdCardStrong(idCard: string) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  if (!idCard || !reg.test(idCard)) return '-'

  idCard = idCard.toString()

  const first = idCard[0]
  const last = idCard[idCard.length - 1]

  let i = 0,
    jm = ''
  while (i <= idCard.length - 1 - 2) {
    jm += '*'
    i++
  }
  return `${first}${jm}${last}`
}

/**
 * 2.普通隐藏规则：
 * @param idCard
 * @returns 显示前1、5、6、7、8、9、10、11、12、18位，其余用*号代替。（凡是系统显示后还需用户检查确认的，可使用这个规则。）示例：3***23197402*****X
 */
export function jmIdCardCommon(idCard: string) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X

  if (!idCard || !reg.test(idCard)) return '-'
  idCard = idCard.toString()

  const length = idCard.length

  const first = idCard[0]
  const last = idCard[length - 1]
  const center = idCard.substring(4, 12)

  const jmFrist = '***'

  let i = 0,
    jmLast = ''
  while (i < length - 12 - 1) {
    jmLast += '*'
    i++
  }
  return `${first}${jmFrist}${center}${jmLast}${last}`
}

/**
 * 加密手机号
 * @param mobile 手机号
 * @param startIndex 前面露几个
 * @param endIndex 后面露几个
 * @returns 显示前3位+****+后4位。如：137****9050
 */
export function jmMobile(mobile: string, startIndex = 3, endIndex = 4) {
  if (!mobile) return '-'

  mobile = mobile.toString()
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(mobile)) return '-'
  ;(startIndex = startIndex || 3), (endIndex = endIndex || 4)
  const first = mobile.slice(0, startIndex)
  const last = mobile.slice(mobile.length - endIndex)

  let jm = '*'

  if (mobile.length > 0) {
    for (let i = 0; i < mobile.length - startIndex - endIndex - 1; i++) {
      jm += '*'
    }
    return `${first}${jm}${last}`
  }
}

/**
 * 加密电话号码
 * @param telPhone 电话号码
 * @param startIndex 前面露几个
 * @param endIndex 后面露几个
 * @returns 推荐的规范：显示区号和后4位，其余用*号代替，如：0571****8709
 */
export function jmTelPhone(telPhone: string, startIndex = 4, endIndex = 4) {
  if (!telPhone) return '-'

  telPhone = telPhone.toString()
  const reg = /^((0\d{2,3})-)?(\d{7,8})$/ // 座机格式  区号之后用'-'隔开
  if (!reg.test(telPhone)) throw new Error('请输入正确座机号')
  ;(startIndex = startIndex || 4), (endIndex = endIndex || 4)
  const first = telPhone.slice(0, startIndex)
  const last = telPhone.slice(telPhone.length - endIndex)

  let jm = '*'
  if (telPhone.length > 0) {
    for (let i = 0; i < telPhone.length - startIndex - endIndex - 1; i++) {
      jm += '*'
    }
    return `${first}${jm}${last}`
  }
}

/**
 * 加密电子邮箱
 * @param email 电子邮箱
 * @param jmNum 加密个数
 * @return @前面的字符显示3位，3位后显示3个*，@后面完整显示 如：con***@163.com
 * 如果少于三位，则全部显示，@前加***，例如tt@163.com 则显示为tt***@163.com
 */
export function jmEmail(email: string, jmNum = 3) {
  if (!email) return '-'

  email = email.toString()
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!reg.test(email)) throw new Error('请输入正确邮箱')

  const aIndex = email.indexOf('@')

  const firstContent = email.substring(0, aIndex)
  const lastContent = email.substring(aIndex, email.length)

  if (firstContent.length < 3) {
    return `${firstContent}***${lastContent}`
  }
  if (firstContent.length >= 3) {
    const first = firstContent.substring(0, 3)
    return `${first}***${lastContent}`
  }
}

/**
 * 加密银行卡号
 * @param bankCardNum
 * @param startIndex
 * @param endIndex
 */
export function jmBank(bankCardNum: string, startIndex = 6, endIndex = 4) {
  if (!bankCardNum) return '-'

  bankCardNum = bankCardNum.toString().replace(/\s*/g, '')
  const reg = /^([1-9]{1})(\d{15}|\d{18})$/
  if (!reg.test(bankCardNum)) throw new Error('请输入正确银行卡号')
  ;(startIndex = startIndex || 6), (endIndex = endIndex || 4)

  const first = bankCardNum.slice(0, startIndex)
  const last = bankCardNum.slice(bankCardNum.length - endIndex)

  let jm = '*'
  if (bankCardNum.length > 0) {
    for (let i = 0; i < bankCardNum.length - startIndex - endIndex - 1; i++) {
      jm += '*'
    }
    return `${first}${jm}${last}`
  }
}

/**
 * 其他各类敏感信息
 * @param content
 * @return 显示前1/3和后1/3段字节，其他用*号代替。
 */
export function jmCommon(content: string) {
  if (!content) return '-'

  content = content.toString().replace(/\s*/g, '')

  const length = content.length // 7
  const n = Math.floor(length / 3) // 2

  const first = content.substring(0, n)
  console.log(first)
  const last = content.substring(length - n, length)
  console.log(last)

  let jm = '*'
  if (length > 0) {
    for (let i = 0; i < length - 2 * n - 1; i++) {
      jm += '*'
    }
    return `${first}${jm}${last}`
  }
}

import { Md5 } from 'ts-md5'
export function jmMd5(str: string) {
  const md5: any = new Md5()
  md5.appendAsciiStr(str)
  return md5.end()
}
