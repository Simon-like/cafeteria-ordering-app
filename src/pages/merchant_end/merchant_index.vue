<script setup lang="ts">
import { componentList } from './index'
import { onLoad, onUnload, onHide, onShow } from '@dcloudio/uni-app'
import { closeBluetooth } from '@/utils/BluetoothAdapter'
import { ref, nextTick, watch } from 'vue'
import {
  useMerchantOrderStore,
  useAdminStore,
  useMerchantPagesStore,
  useMerchantStore,
} from '@/stores'
import { GetMerchantInfo } from '@/services/merchant/merchant_api'
import WS from '@/utils/websocket'
import BATTS from '@/utils/voice_utils' //语音类测试

/**
 * @description 商户端入口页面
 * @author 应东林
 * @date 2024-09-21
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-21
 */

const Merchant = useMerchantStore()
const adminStore = useAdminStore()
const MerchantPages = useMerchantPagesStore()
// 本地订单数据
const OrderStore = useMerchantOrderStore()

type socketInfo = {
  orderId: number
  OrderNumber: number
  type: number
  TO_BE_CONFIRMED: number
}

const HandleGetInfo = async () => {
  const res = await GetMerchantInfo()
  Object.assign(Merchant, res.data)
  Merchant.operationStatus = res.data.operationStatus
  let [time_start, time_end] = res.data.businessHours.split('-')
  Merchant.time_start = time_start
  Merchant.time_end = time_end
}

const initWS = () => {
  console.log('你倒是连啊')
  MerchantPages.ws = new WS({
    // 连接websocket所需参数
    data: { userId: '' },
    // 首次连接成功之后，断线重新连接后也会触发（防止断线期间对方发送消息未接收到）
    onConnected: (data: string) => {
      console.log('历史消息', data)
    },
    onError: () => {
      //意外断开
      console.log('不对吧', MerchantPages.ws)
    },
    // 监听接收到服务器消息
    onMessage: (data: string) => {
      // 使用正则提取 JSON 字符串部分
      const jsonString = data.match(/{.*}/)[0] // 匹配第一个大括号之间的内容
      const socketData = JSON.parse(jsonString) as socketInfo
      console.log(socketData)
      nextTick(() => {
        OrderStore.to_be_confirmed = socketData.TO_BE_CONFIRMED
        console.log(socketData.TO_BE_CONFIRMED)
        OrderStore.order_notice = !OrderStore.order_notice
      })
      let BA = new BATTS()
      BA.speak('来订单了！请注意查看！')
      BA.playVibrate()
      uni.showToast({
        icon: 'none',
        title: '来订单了！请注意查看！',
      })
    },
  })
}

onLoad(async () => {
  await HandleGetInfo()
  adminStore.init()
  //检查websocket是否连接成功
  console.log(MerchantPages.ws)
  if (!MerchantPages.ws || MerchantPages.ws.status === 'notConnected') {
    MerchantPages.ws = null
    initWS()
  }
})

// 页面销毁，断开websocket
onUnload(() => {
  console.log('页面关了')
  // 主动关闭websocket
  if (!!MerchantPages.ws && MerchantPages.ws.status === 'connected') MerchantPages.ws.close()
  //断开蓝牙
  closeBluetooth(MerchantPages.RWInfo.deviceId)
  MerchantPages.initRWInfo()
})
// 安卓后台保活
const linAlive = uni.requireNativePlugin('Lin-Alive')
onShow(() => {
  linAlive.stopAliveService((res) => {
    console.log('停止保活服务: ' + JSON.stringify(res))
  })
})
onHide(() => {
  linAlive.startAliveService(
    {
      title: '保持后台运行',
      description: '持续获取后台数据',
      hideFromTaskList: false,
      sendStatusWhenScreenOn: true,
      sendStatusScreenOnTime: 2,
      enableWakeLock: true,
      wakeLockScreenTime: 1,
    },
    (res) => {
      console.log(res)
      console.log('啊，怎么回事', MerchantPages.ws)
    },
  )
  linAlive.checkNotificationPermission((res) => {
    console.log('检查通知权限是否开启: ' + JSON.stringify(res))
  })
  // linAlive.runInBackground((res) => {
  //   console.log(res)
  //   console.log('应用去后台啦', MerchantPages.ws)
  // })
  linAlive.ignoreBatteryOptimization((res) => {
    console.log('关闭电池优化', res)
  })
})
</script>

<template>
  <view class="index">
    <custom-nav-bar></custom-nav-bar>
    <HeaderBar></HeaderBar>
    <component :is="componentList[MerchantPages.tabbarIndex]"></component>
    <MerchantTabbar></MerchantTabbar>
  </view>
</template>

<style lang="scss" scoped>
.index {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
