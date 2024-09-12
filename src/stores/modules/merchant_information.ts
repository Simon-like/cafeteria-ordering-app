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
    // 保存商户信息，登录时使用
    const addUserinfo = (type: string = '', content: string = '') => {
      switch (type) {
        case 'phoneNumber':
          phoneNumber.value = content
          break
        case 'realName':
          realName.value = content
          break
        case 'name':
          name.value = content
          break
        case 'address':
          address.value = content
          break
        case 'password':
          password.value = content
          break
        case 'college':
          college.value = content
          break
      }
    }
    // 修改商户信息
    const changeUserinfo = (type: string = '', content: string = '') => {
      switch (type) {
        case 'phoneNumber':
          phoneNumber.value = content
          break
        case 'realName':
          realName.value = content
          break
        case 'name':
          name.value = content
          break
        case 'address':
          address.value = content
          break
        case 'password':
          password.value = content
          break
        case 'college':
          college.value = content
          break
      }
    }
    // 删除商户信息中的某个字段
    const deleteUserinfo = (type: string = '', content: string = '') => {
      switch (type) {
        case 'phoneNumber':
          phoneNumber.value = content
          break
        case 'realName':
          realName.value = content
          break
        case 'name':
          name.value = content
          break
        case 'address':
          address.value = content
          break
        case 'password':
          password.value = content
          break
        case 'college':
          college.value = content
          break
      }
    }
    // 清理商户信息，退出时使用
    const clearUserinfo = () => {
      phoneNumber.value = ''
      realName.value = ''
      name.value = ''
      address.value = ''
      password.value = ''
      college.value = ''
    }

    // 记得 return
    return {
      phoneNumber,
      realName,
      name,
      address,
      password,
      college,
      addUserinfo,
      changeUserinfo,
      clearUserinfo,
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
