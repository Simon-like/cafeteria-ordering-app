import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMerchantStore = defineStore(
  'merchant_information',
  () => {
    // 商户信息
    const phoneNumber = ref<string>('')
    const realName = ref<string>('') //所有人名称
    const name = ref<string>('') //店铺名称
    const address = ref<string>('')
    const addressId = ref<string>('') //区域Id
    const detailedAddress = ref<string>('')
    const password = ref<string>('')
    const collegeId = ref<string>('')
    const collegeName = ref<string>('')
    const validationCode = ref<string>()
    //return新增的
    const businessHours = ref<string>('')
    const time_start = ref<string>('')
    const time_end = ref<string>('')
    const contactPhone = ref<string>('')
    const discription = ref<string>('')
    const operationStatus = ref<number>(1)
    const logo = ref<string>('')
    const id = ref<string>('')

    const init = () => {
      phoneNumber.value = ''
      realName.value = ''
      id.value = ''
      name.value = ''
      address.value = ''
      detailedAddress.value = ''
      collegeId.value = ''
      collegeName.value = ''
      businessHours.value = ''
      time_start.value = ''
      time_end.value = ''
      contactPhone.value = ''
      logo.value = ''
      discription.value = ''
      addressId.value = ''
    }

    // 记得 return
    return {
      phoneNumber,
      realName,
      name,
      address,
      detailedAddress,
      password,
      collegeId,
      collegeName,
      businessHours,
      contactPhone,
      discription,
      operationStatus,
      logo,
      id,
      validationCode,
      time_start,
      time_end,
      addressId,
      init,
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
