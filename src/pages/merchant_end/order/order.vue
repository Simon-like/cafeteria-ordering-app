<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import type { AsideItem } from '@/types/aside'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import Header from './components/Header.vue'
import OderItemComponent from './components/OderItemComponent.vue'
import { useMerchantOrderStore } from '@/stores'
import { getLastDays, throttle, formatDate } from '@/composables/tools'
import { getOrdersByStatus, countTwoStatus } from '@/services/merchant/merchant_shop_order_api'
/**
 * @description 订单管理主页面
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-16
 */

// 本地订单数据
const OrderStore = useMerchantOrderStore()

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '待处理', active: true, addNumber: OrderStore.to_be_confirmed },
  { itemId: 1, itemName: '已确认', active: false, addNumber: OrderStore.confirmed },
  { itemId: 2, itemName: '已完成', active: false },
  { itemId: 3, itemName: '查询某订单', active: false },
])

const scrollTop = ref<number>(0)
const goTop = (e: any) => {
  scrollTop.value = 1
  // 解决view层不同步的问题
  nextTick(function () {
    scrollTop.value = 0
    uni.showToast({
      icon: 'none',
      title: '已返回顶部',
    })
  })
}

//触底加载
//加载图标状态
const loading_status = ref<string>('more') //加载前more/加载中loading/加载后noMore
const onLoading_moreOrder = async () => {
  if (OrderStore.queryFlag) {
    // 如果是查询状态的话，就退出
    return
  }
  loading_status.value = 'loading'
  //获取当前订单最大的序号s
  let maxNumber: number
  let length = OrderStore.localOrderData.length
  if (length > 0) {
    maxNumber = OrderStore.localOrderData[length - 1].orderNumber
  } else {
    maxNumber = 0
  }
  //追加订单
  const res = await getOrdersByStatus(
    OrderStore.oderType.value,
    OrderStore.status,
    OrderStore.date.value,
    maxNumber,
  )
  if (res.code === 1) {
    if (res.data.list.length > 0) {
      loading_status.value = 'more'
      res.data.list.forEach((value, index, arr) => {
        arr[index].menu.forEach((item, i, a) => {
          a[i].dishPrice = +a[i].dishPrice.toFixed(2)
        })
      })
      OrderStore.localOrderData.push(...res.data.list)
    } else {
      loading_status.value = 'noMore'
    }
    await getCount()
  } else {
    uni.showToast({
      icon: 'none',
      title: '刷新订单失败！',
    })
    loading_status.value = 'noMore'
  }
}
//截流处理
const onLoading_throttle = throttle(onLoading_moreOrder, 500)

// 订单状态切换
const onSwitch = async (e: number) => {
  //切换到查询状态
  if (e === 3) {
    OrderStore.queryFlag = true
    OrderStore.localOrderData = []
    loading_status.value = 'noMore'
  } else {
    OrderStore.queryFlag = false
    loading_status.value = 'more'
  }
  //待处理
  if (e === 0) {
    OrderStore.status = 2
    OrderStore.localOrderData = []
    //获取订单
    await onLoading_moreOrder()
  }
  //已确认
  if (e === 1) {
    OrderStore.status = 3
    OrderStore.localOrderData = []
    //获取订单
    await onLoading_moreOrder()
  }
  //已完成
  if (e === 2) {
    OrderStore.status = 4
    OrderStore.localOrderData = []
    //获取订单
    await onLoading_moreOrder()
  }
}

//订单数据加载
const getOrder_loading = async () => {
  const res = await getOrdersByStatus(
    OrderStore.oderType.value,
    OrderStore.status,
    OrderStore.date.value,
    0,
  )
  if (res.code === 1) {
    OrderStore.localOrderData = res.data.list
    OrderStore.localOrderData.forEach((value, index, arr) => {
      arr[index].menu.forEach((item, i, a) => {
        a[i].dishPrice = +a[i].dishPrice.toFixed(2)
      })
    })
    await getCount()
  } else {
    uni.showToast({
      icon: 'none',
      title: '刷新订单失败！',
    })
  }
}

// 主动获取订单数量
const getCount = async () => {
  const res = await countTwoStatus()
  if (res.code === 1) {
    OrderStore.confirmed = res.data.CONFIRMED
    OrderStore.to_be_confirmed = res.data.TO_BE_CONFIRMED
  } else {
    uni.showToast({
      icon: 'none',
      title: '获取数量失败！',
    })
  }
}

watch(OrderStore, (newValue, oldValue) => {
  my_aside_list.value[0].addNumber = OrderStore.to_be_confirmed
  my_aside_list.value[1].addNumber = OrderStore.confirmed
})
// 进入订单页面初始化
onLoad(async () => {
  OrderStore.date.label = '今日'
  OrderStore.date.value = getLastDays(1)[0]
  OrderStore.status = 2 //订单状态定位到未处理订单上
  //获取订单

  await getOrder_loading()
})
</script>

<template>
  <view class="oder">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <view class="main">
      <Header />
      <view class="content">
        <view class="fn-wrapper">
          <scroll-view
            :scroll-top="scrollTop"
            scroll-y="true"
            class="scroll-Y"
            :lower-threshold="100"
            @scrolltolower="onLoading_throttle"
          >
            <view class="null-content" v-show="OrderStore.localOrderData.length === 0"
              >没有相关类型的订单数据</view
            >
            <OderItemComponent
              :orderItem="item"
              v-for="item in OrderStore.localOrderData"
              :key="item.orderID"
            />
            <uni-load-more
              :status="loading_status"
              v-show="OrderStore.localOrderData.length !== 0"
            ></uni-load-more>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.oder {
  border-radius: 28rpx 28rpx 0 0;
  box-shadow: 0 -6rpx 10rpx rgba(0, 0, 0, 0.15);
  padding: 25rpx 0 0 20rpx;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.main {
  width: 590rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 26rpx;
  padding: 20rpx 16rpx;
  font-size: 30rpx;
  .content {
    margin-top: 36rpx;
    width: 100%;
    height: 100%;
    .fn-wrapper {
      height: 1100rpx;

      .scroll-Y {
        height: 100%;
        position: relative;
        .null-content {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          font-size: 36rpx;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
