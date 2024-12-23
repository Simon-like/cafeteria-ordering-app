import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { OrderItem, MenuItem, specItem, dishData } from '@/types/merchant_return'
import { getLastDays } from '@/composables/tools'
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
    const localOrderData = ref<OrderItem[]>([]) //本地订单数据

    const date = reactive({
      label: '今日',
      value: getLastDays(7)[0],
    }) //当前选中的时间,下单时间，查询的细度为月-日,默认为今日
    const oderType = reactive({
      label: '外卖单',
      value: 0,
    }) //订单类型，外卖0，堂食1
    const status = ref<number>(2) //订单状态，待处理订单2，已确认订单3（点击接单还未完成），
    //已完成的订单4（已确认的订单点击完成），已取消订单7（点击复原退回到状态1），已退款订单8

    const queryFlag = ref<boolean>(false) //是否处于查询状态

    const confirmed = ref<number>(0)
    const to_be_confirmed = ref<number>(0) //待接单数量
    const order_notice = ref<boolean>(false) //来单状态变更，用于触发watch监听器

    return {
      localOrderData,
      date,
      oderType,
      status,
      queryFlag,
      confirmed,
      to_be_confirmed,
      order_notice,
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
