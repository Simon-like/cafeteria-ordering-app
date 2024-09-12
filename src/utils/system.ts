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
