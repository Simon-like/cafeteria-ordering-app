import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMerchantStore = defineStore(
  'merchant_information',
  () => {
    // 商户信息
    const phoneNumber = ref<string>()
    const realName = ref<string>()
    const name = ref<string>()
    const address = ref<string>()
    const password = ref<string>()
    const college = ref<string>()
    //return新增的
    const businessHours = ref<string>()
    const contactPhone = ref<string>()
    const deleteStatus = ref<number>()
    const discription = ref<string>()
    const operationStatus = ref<number>()
    const logo = ref<string>()
    const merchantId = ref<number>()
    const version = ref<number>()

    // 记得 return
    return {
      phoneNumber,
      realName,
      name,
      address,
      password,
      college,
      businessHours,
      contactPhone,
      deleteStatus,
      discription,
      operationStatus,
      logo,
      merchantId,
      version,
    }
  },
  // TODO: 持久化
  {
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
