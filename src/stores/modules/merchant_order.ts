import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { OrderItem, MenuItem, specItem, dishData } from '@/types/merchant_return'
/**
 * @description 商户端订单管理的仓库
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-16
 */
// 定义 Store
export const useMerchantOrderStore = defineStore(
  'merchant_order',
  () => {
    const localOrderData = ref<OrderItem[]>([])
    return { localOrderData }
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
