import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useTabbarInfoStore = defineStore(
  'tabbar_info',
  () => {
    const userType = ref<string>('merchant')
    const pageIndex = ref<number>(0)

    return {
      userType,
      pageIndex,
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
