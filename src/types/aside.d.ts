/**
 * 侧边栏区域的数据类型
 */

export type AsideItem = {
  itemId: number
  /** 选项名称 */
  itemName: string
  /** 选项激活状态 */
  active: boolean
  /** 选项跳转url */
  hrefUrl: string
}

export type resMsg = {
  code: number
  /** 响应码 */
  msg: string
  /** 错误信息 */
  data: object
  /** 返回信息 */
}
