import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
/**
 * @description 商户端订单管理的仓库
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-24
 */
// 定义 Store
export const useMerchantShopStore = defineStore(
  'merchant_oder',
  () => {
    //
    const oderType = ref<number>() //订单类型

    return {}
  },
  // TODO: 持久化
  {
    //网页端 persist: true,
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
