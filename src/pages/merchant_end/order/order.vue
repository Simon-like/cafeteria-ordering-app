<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { AsideItem } from '@/types/aside'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import Header from './components/Header.vue'
import OderItemComponent from './components/OderItemComponent.vue'
import WS from '@/utils/websocket'
import { useMerchantOrderStore } from '@/stores'
import { getLastDays, throttle, formatDate } from '@/composables/tools'
import { getOrdersByStatus } from '@/services/merchant/merchant_shop_order_api'
import { initBluetooth, writeBLEValueLoop, closeBluetooth } from '@/utils/BluetoothAdapter'
import { Printer } from '@/utils/ble/Printer'
// import { Bluetooth, sleep } from '@/utils/ble/Bluetooth'
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
  { itemId: 0, itemName: '待处理', active: true, addNumber: 10 },
  { itemId: 1, itemName: '已确认', active: false, addNumber: 2 },
  { itemId: 2, itemName: '已完成', active: false },
  { itemId: 3, itemName: '已退款', active: false },
  { itemId: 4, itemName: '查询某订单', active: false },
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
  if (my_aside_list.value[4].active === true) {
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
      OrderStore.localOrderData.push(...res.data.list)
    } else {
      loading_status.value = 'noMore'
    }
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
  if (e === 4) {
    OrderStore.queryFlag = true
    OrderStore.localOrderData = []
    loading_status.value = 'noMore'
  } else {
    OrderStore.queryFlag = false
    loading_status.value = 'more'
  }
  //待处理
  if (OrderStore.status !== 2 && e === 0) {
    OrderStore.status = 2
    OrderStore.localOrderData = []
    //获取订单
    await onLoading_throttle()
  }
  //已确认
  if (OrderStore.status !== 3 && e === 1) {
    OrderStore.status = 3
    OrderStore.localOrderData = []
    //获取订单
    await onLoading_throttle()
  }
  //已完成
  if (OrderStore.status !== 4 && OrderStore.status !== 5 && OrderStore.status !== 6 && e === 2) {
    OrderStore.status = 4
    OrderStore.localOrderData = []
    //获取订单
    await onLoading_throttle()
  }
  //已退款
  if (OrderStore.status !== 8 && e === 3) {
    OrderStore.status = 8
    OrderStore.localOrderData = []
    //获取订单
    await onLoading_throttle()
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
  } else {
    uni.showToast({
      icon: 'none',
      title: '刷新订单失败！',
    })
  }
}

// 打印
const print = async () => {
  console.log('simon')
  const buffer = new Printer()
    .setAlign('ct')
    .setSize(1, 2)
    .print('居中标题')
    .setAlign('lt')
    .setSize(1, 1)
    .printFill()
    .printLR('左侧文字', '右侧文字')
    .printLCR('左侧文字', '中间文字', '右侧文字')
    .setSize(2, 1)
    .print('宽度放大文字')
    .setSize(1, 2)
    .print('高度放大文字')
    .setSize(2, 2)
    .print('等比放大文字')
    .setSize(1, 1)
    .printFill()
    .print('打印时间：' + formatDate('yyyy-MM-dd hh:mm:ss'))
    .println()
    .end()

  console.log(buffer)

  writeBLEValueLoop(buffer).then((res) => {
    setTimeout(() => {
      console.log('加载-----')
    }, 1000)
  })
}

// 进入订单页面初始化
let ws = null
onLoad(async () => {
  OrderStore.date.label = '今日'
  OrderStore.date.value = getLastDays(1)[0]
  OrderStore.status = 2 //订单状态定位到未处理订单上
  //获取订单

  await getOrder_loading()
  //await initBluetooth()
  //await print()
  //ws连接
  ws = new WS({
    // 连接websocket所需参数
    data: { userId: '' },
    // 首次连接成功之后，断线重新连接后也会触发（防止断线期间对方发送消息未接收到）
    onConnected: () => {
      // toDo
      // 一般用于请求历史消息列表 getHistoryList()
    },
    // 监听接收到服务器消息
    onMessage: (data: string) => {
      console.log(data)
    },
  })
})

// 页面销毁，断开websocket
onUnload(() => {
  // 主动关闭websocket
  ws.close()
  //断开蓝牙
  closeBluetooth()
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
