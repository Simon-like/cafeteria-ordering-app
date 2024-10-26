/**
 * @description 好用的工具函数
 * @author 应东林
 * @date 2024-10-21
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-21
 */

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
