import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
/**
 * @description 管理端组件索引值的仓库
 * @author 应东林
 * @date 2024-09-23
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-23
 */
// 定义 Store
export const useAdminPagesStore = defineStore(
  'admin_pages',
  () => {
    const tabbarIndex = ref<number>(0)
    const shopIndex = ref<number>(0)
    const myIndex = ref<number>(0)

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
