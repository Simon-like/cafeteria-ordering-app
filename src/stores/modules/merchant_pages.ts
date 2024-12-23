import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
/**
 * @description 商户端组件索引值的仓库
 * @author 应东林
 * @date 2024-09-23
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-21
 */
// 定义 Store
export const useMerchantPagesStore = defineStore(
  'merchant_pages',
  () => {
    const tabbarIndex = ref<number>(0)
    const shopIndex = ref<number>(0)
    const myIndex = ref<number>(0)
    const ws = null //websocket对象
    const RWInfo = ref<{
      deviceId: string ///蓝牙设备的 ID
      serviceId: string //蓝牙服务的 ID
      characteristicId: string //蓝牙特征值的 ID
      name: string //连接的蓝牙设备名称
    }>({
      deviceId: '',
      serviceId: '',
      characteristicId: '',
      name: '',
    })

    const initRWInfo = () => {
      RWInfo.value = {
        deviceId: '',
        serviceId: '',
        characteristicId: '',
        name: '',
      }
    }

    const initialize = () => {
      tabbarIndex.value = 0
      shopIndex.value = 0
      myIndex.value = 0
    }

    return {
      tabbarIndex,
      shopIndex,
      myIndex,
      initialize,
      ws,
      RWInfo,
      initRWInfo,
    }
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
