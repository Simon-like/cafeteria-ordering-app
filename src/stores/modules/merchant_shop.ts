import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
/**
 * @description 商户端店铺管理的仓库
 * @author 应东林
 * @date 2024-10-02
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-02
 */
// 定义 Store
export const useMerchantShopStore = defineStore(
  'merchant_shop',
  () => {
    //店铺管理-菜品管理
    //菜品类型
    const dishStatus = ref<number>(4) // 菜品的状态，热销0、缺货1、下架2，其他3，不考虑这个因素4
    const categoryId = ref<number>(-1) // 分类ID，不考虑就填-1
    const isDiscounted = ref<number>(2) // 是否打折。0表示不打折，1表示打折，2不考虑这个
    const isDeliver = ref<number>(2) // 单点是否配送。0表示单点不配送，1单点配送,2不考虑这个

    const initializeCategory = () => {
      dishStatus.value = 4
      categoryId.value = -1
      isDiscounted.value = 2
      isDeliver.value = 2
    }

    // 菜品信息
    const description = ref<string>('')
    const dishDescription = ref<string>('')
    const dishName = ref<string>('')
    const price = ref<number>(0)
    const specifications = ref<string[]>([])
    const imageUrl = ref<string>('')

    const initializeDishInfo = () => {
      description.value = ''
      dishDescription.value = ''
      dishName.value = ''
      price.value = 0
      specifications.value = []
      imageUrl.value = ''
    }

    return {
      dishStatus,
      categoryId,
      isDiscounted,
      isDeliver,
      description,
      dishDescription,
      dishName,
      specifications,
      price,
      imageUrl,
      initializeCategory,
      initializeDishInfo,
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
