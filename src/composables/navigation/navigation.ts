import { useDoubleTokenStore } from '@/stores'
import { useAdminPagesStore } from '@/stores'
import { useMerchantPagesStore } from '@/stores'

/**
 * @description 页面跳转函数大全
 * @author 应东林
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-19
 */

// 进入商户端首页
export const gotoMerchantHome = () => {
  uni.reLaunch({
    url: '/pages/merchant_end/merchant_index',
  })
}

// 进入管理端首页
export const gotoAdminHome = () => {
  uni.reLaunch({
    url: '/pages/admin_end/admin_index',
  })
}

export const gotoLogin = () => {
  uni.reLaunch({
    url: '/pages/login_register/login_register',
  })
}
// 退出登录回首页
export const gotoLoginAndRegister = () => {
  const DoubleTokenStore = useDoubleTokenStore()
  const AdminPagesStore = useAdminPagesStore()
  const MerchantPagesStore = useMerchantPagesStore()
  uni.reLaunch({
    url: '/pages/login_register/login_register',
  })
  DoubleTokenStore.removeToken(2)
  MerchantPagesStore.initialize()
  AdminPagesStore.initialize()
}
