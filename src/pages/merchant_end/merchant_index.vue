<script setup lang="ts">
import { componentList } from './index'
import { onLoad, onUnload } from '@dcloudio/uni-app'
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
  MerchantPages.ws = new WS({
    // 连接websocket所需参数
    data: { userId: '' },
    // 首次连接成功之后，断线重新连接后也会触发（防止断线期间对方发送消息未接收到）
    onConnected: (data: string) => {
      console.log('历史消息', data)
    },
    onError: () => {
      //意外断开
      MerchantPages.ws = null
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
  if (!MerchantPages.ws) {
    initWS()
  }
})

// 页面销毁，断开websocket
onUnload(() => {
  // 主动关闭websocket
  if (MerchantPages.ws) MerchantPages.ws.close()
  //断开蓝牙
  closeBluetooth(MerchantPages.RWInfo.deviceId)
  MerchantPages.initRWInfo()
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
