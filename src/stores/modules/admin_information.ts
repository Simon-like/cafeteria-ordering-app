import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useAdminStore = defineStore(
  'admin_information',
  () => {
    // 管理员信息
    const phoneNumber = ref<string>()
    const password = ref<string>()
    const inviteCode = ref<string>()
    const realName = ref<string>()
    const validationCode = ref<string>()
    const college = ref<string>()
    // 记得 return
    return {
      phoneNumber,
      password,
      inviteCode,
      realName,
      validationCode,
      college,
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
