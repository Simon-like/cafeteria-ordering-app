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

// 退出登录回首页
export const gotoLoginAndRegister = () => {
  const DoubleTokenStore = useDoubleTokenStore()
  const AdminPagesStore = useAdminPagesStore()
  const MerchantPagesStore = useMerchantPagesStore()
  uni.navigateBack({
    delta: 1,
  })
  DoubleTokenStore.removeToken(2)
  MerchantPagesStore.initialize()
  AdminPagesStore.initialize()
}
