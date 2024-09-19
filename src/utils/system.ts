/**
 * @description 移动端顶部适配函数，计算占位空间，配合组件的custom-nav-bar使用
 * @author 应东林
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-19
 */

const SYSTEM_INFO = uni.getSystemInfoSync()

export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 0

export const getTitleBarHeight = () => {
  // #ifndef H5 || APP
  const MENU_INFO = uni.getMenuButtonBoundingClientRect()
  return MENU_INFO.height + (MENU_INFO.top - getStatusBarHeight()) * 2
  // #endif

  return 0
}

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()
