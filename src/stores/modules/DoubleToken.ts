import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useDoubleTokenStore = defineStore(
  'DoubleToken',
  () => {
    const accessToken = ref<string>('') //请求token
    const refreshToken = ref<string>('') //刷新token

    const addToken = (ac: string = '', re: string = '') => {
      accessToken.value = ac
      refreshToken.value = re
    }

    // 0移除accessToken，1移除refreshToken，2都移除
    const removeToken = (type: number) => {
      if (type === 0) accessToken.value = ''
      else if (type === 1) refreshToken.value = ''
      else {
        accessToken.value = ''
        refreshToken.value = ''
      }
    }

    return {
      accessToken,
      refreshToken,
      addToken,
      removeToken,
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
