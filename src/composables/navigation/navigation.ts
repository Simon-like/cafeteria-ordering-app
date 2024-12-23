import { useAdminPagesStore } from '@/stores'
import { useMerchantPagesStore } from '@/stores'
import { useDoubleTokenStore } from '@/stores'
import { closeBluetooth } from '@/utils/BluetoothAdapter'
//测试用
/**
 * @description 页面跳转函数大全,附带跳转逻辑
 * @author 应东林
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-21
 */

// 进入商户端首页
export const gotoMerchantHome = async () => {
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
  uni.redirectTo({
    url: '/pages/login_register/login_register',
  })
  const DoubleTokenStore = useDoubleTokenStore()
  const AdminPagesStore = useAdminPagesStore()
  const MerchantPagesStore = useMerchantPagesStore()
  DoubleTokenStore.removeToken(2)
  MerchantPagesStore.initialize()
  AdminPagesStore.initialize()
  // 主动关闭websocket
  if (!!MerchantPagesStore.ws) MerchantPagesStore.ws.close()
  //断开蓝牙
  console.log(MerchantPagesStore.RWInfo)
  closeBluetooth(MerchantPagesStore.RWInfo.deviceId)
  MerchantPagesStore.initRWInfo()
}
