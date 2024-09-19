import { useDoubleTokenStore } from '@/stores'

/**
 * @description 页面跳转函数大全
 * @author 应东林
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-19
 */

export const gotoHome = () => {
  uni.switchTab({
    url: '/pages/merchant_end/index/index',
  })
}

// 退出登录回首页
export const gotoLoginAndRegister = () => {
  const DoubleTokenStore = useDoubleTokenStore()
  uni.navigateTo({
    url: '/pages/login_register/login_register',
  })
  DoubleTokenStore.removeToken(2)
}
