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
