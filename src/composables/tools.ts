/**
 * @description 好用的工具函数
 * @author 应东林
 * @date 2024-10-21
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-21
 */

// 截流函数
export const throttle = (fn: Function, delay: number) => {
  let timer: any = null
  return function (...theArgs) {
    const context = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(context, theArgs)
        timer = null
      }, delay || 0)
    }
  }
}

// 防抖函数
export const debounce = (fn: Function, ms: number, Immediate: boolean = false) => {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function but received: ' + typeof fn)
  }
  // Immediate选择是否立即执行
  let timer: any = null
  return function (...theArgs) {
    if (timer) {
      clearTimeout(timer)
    }
    if (Immediate) {
      const flag = !timer
      flag && fn.apply(this, theArgs)
      timer = setTimeout(() => {
        timer = null
      }, ms)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, theArgs)
        timer = null
      }, ms)
    }
  }
}

// 深拷贝
export const deepCopy = (obj: object) => {
  return JSON.parse(JSON.stringify(obj))
}

// 将公告内容分割成段
export const splitContent = (str: string): string[] => {
  const linesArray = str.split('\n').filter((line) => line.trim() !== '')
  return linesArray || []
}

// 获取往前days天的日期信息
export const getLastDays = (days: number) => {
  const today = new Date()
  const lastSevenDays = []

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i) // 获取今天往前第i天的日期

    const month = String(date.getMonth() + 1).padStart(2, '0') // 取得年份后两位
    const day = String(date.getDate()).padStart(2, '0') // 获取日期并补零到两位

    lastSevenDays.push(`${month}-${day}`) // 按照YY-DD格式推入数组
  }

  return lastSevenDays
}

/**
 * 格式化时间
 * @param {date} date Date
 * @param {string} fmt yyyy-MM-dd hh:mm:ss
 */
export const formatDate = (fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const date = new Date()
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      )
  return fmt
}

/**
 * 判读是否为空
 * @param {any} v
 * isEmpty()              //true
 * isEmpty([])            //true
 * isEmpty({})            //true
 * isEmpty(0)             //true
 * isEmpty(Number("abc")) //true
 * isEmpty("")            //true
 * isEmpty("   ")         //true
 * isEmpty(false)         //true
 * isEmpty(null)          //true
 * isEmpty(undefined)     //true
 */
export const isEmpty = (v) => {
  switch (typeof v) {
    case 'undefined':
      return true
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
      break
    case 'boolean':
      if (!v) return true
      break
    case 'number':
      if (0 === v || isNaN(v)) return true
      break
    case 'object':
      if (null === v || v.length === 0) return true
      for (var i in v) {
        return false
      }
      return true
  }
  return false
}

/**
 * 密码为8~20位数字和字母组合
 * @param {String} value
 */
export const checkPwd = (value) => {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value)
}
/**
 * 格式化手机号码
 * @param {String}
 * @return 133*****9999
 */
export const formatMobile = (num) => {
  if (utils.isMobile(num)) {
    num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
  }
  return num
}
/**
 * 金额格式化
 * @return 86,117.00
 */
export const formatMoney = (money) => {
  return parseFloat(money)
    .toFixed(2)
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .replace(/\,$/, '')
    .split('')
    .reverse()
    .join('')
}
