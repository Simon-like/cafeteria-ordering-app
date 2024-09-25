import { useDoubleTokenStore } from '@/stores'

/**
 * @description 页面跳转函数大全
 * @author 应东林
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-19
 */

// 进入商户端首页
export const gotoMerchantHome = () => {
  uni.navigateTo({
    url: '/pages/merchant_end/merchant_index',
  })
}

// 进入管理端首页
export const gotoAdminHome = () => {
  uni.navigateTo({
    url: '/pages/admin_end/admin_index',
  })
}

export const gotoLogin = () => {
  uni.navigateTo({
    url: '/pages/login_register/login_register',
  })
}
// 退出登录回首页
export const gotoLoginAndRegister = () => {
  const DoubleTokenStore = useDoubleTokenStore()
  uni.navigateBack({
    delta: 1,
  })
  DoubleTokenStore.removeToken(2)
}
