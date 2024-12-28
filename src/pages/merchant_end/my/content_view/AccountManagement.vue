<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { gotoLoginAndRegister } from '@/composables/navigation/navigation'
import { useMerchantStore, useMerchantPagesStore } from '@/stores'
import {
  openBluetooth,
  findBluetooth,
  connectionBluetooth,
  closeBluetooth,
  getReadWriteBLEValue,
} from '@/utils/BluetoothAdapter'

const Merchant = useMerchantStore()
const MerchantPages = useMerchantPagesStore()

const show = ref<boolean>(false) //设备选择框的显示
const loading_show = ref<boolean>(false) //加载页的显示
const loading_text = ref<string>('')
const columns = reactive([
  [
    {
      label: '没有找到任何设备', //name
      // 其他属性值
      deviceId: 'simon',
      RSSI: 0,
      localName: 'simon',
      advertisServiceUUIDs: [],
      advertisData: {},
      name: 'simon',
    },
  ],
]) //设备列表

let find_flag = 0 //连接时长变化值
//连接蓝牙设备
const onConnectionBLE = async () => {
  columns[0] = []
  columns[0].push({
    label: '没有找到任何设备', //name
    // 其他属性值
    deviceId: 'simon',
    RSSI: 0,
    localName: 'simon',
    advertisServiceUUIDs: [],
    advertisData: {},
    name: 'simon',
  }) //初始化
  loading_text.value = '扫描蓝牙设备中...'
  loading_show.value = true
  try {
    await openBluetooth()
    await findBluetooth((find_flag % 3) * 1000 + 1000).then((res) => {
      if (res.length !== 0) {
        columns[0] = []
        res.forEach((item) => {
          if (item.name) {
            columns[0].push({ label: '设备名称：' + item.name, ...item })
          }
        })
      }
      console.log('搜到的设备', columns)
      loading_show.value = false
      show.value = true
      find_flag++
      uni.showToast({
        icon: 'none',
        title: '如果没有对应设备，请退出重新刷新！',
        duration: 2000,
      })
    })
  } catch (error) {
    uni.showToast({
      icon: 'error',
      title: '扫描失败！',
    })
    loading_show.value = false
  }
}
// 关闭弹窗
const onCancel = () => {
  show.value = false
}

type deviceType = {
  deviceId: string
  name: string
  RSSI: number
  localName: string
  advertisServiceUUIDs: string[]
  advertisData: Object
}

//选择设备
const onConfirm = async (e: any) => {
  show.value = false
  const { indexs, value, values } = e
  MerchantPages.initRWInfo()
  if (value[0].deviceId === 'simon') {
    uni.showToast({
      icon: 'none',
      title: '没有发现设备，请检查连接！',
    })
    return
  }
  loading_text.value = '连接蓝牙设备中'
  loading_show.value = true
  try {
    const res = await connectionBluetooth(value[0].deviceId)
    console.log('连接', res)
    console.log(value[0])
    const RW_res = await getReadWriteBLEValue(value[0] as deviceType)
    MerchantPages.RWInfo = RW_res.RWInfo
    console.log(MerchantPages.RWInfo)
  } catch (error) {
    console.log(error)
    uni.showToast({
      icon: 'error',
      title: '连接失败！',
    })
    closeBluetooth(MerchantPages.RWInfo.deviceId)
    MerchantPages.initRWInfo()
  }
  loading_show.value = false
}

const onCloseBLE = () => {
  closeBluetooth(MerchantPages.RWInfo.deviceId)
  MerchantPages.initRWInfo()
}
</script>

<template>
  <view class="account-mana">
    <view class="platform-logo"> <image src="@/static/images/kssdt.png"></image> </view>
    <view class="account-info"> 当前账号：{{ Merchant.name }} </view>
    <view class="bluetooth-wrapper">
      <view>蓝牙打印机连接：</view>
      <view class="box" @click="onCloseBLE" v-if="!!MerchantPages.RWInfo.deviceId">
        {{ MerchantPages.RWInfo.name + '（点击断开）' }}
      </view>
      <view class="box off" @click="onConnectionBLE" v-else> 未连接！(点击连接) </view>
    </view>
    <view class="outlogin" @click="gotoLoginAndRegister"><button>退出登录</button></view>

    <!-- 蓝牙设备选择 -->
    <up-picker
      :show="show"
      :columns="columns"
      keyName="label"
      @cancel="onCancel"
      @confirm="onConfirm"
    ></up-picker>
    <!-- 加载页 -->
    <up-loading-page
      :loading="loading_show"
      :loading-text="loading_text"
      :color="'#000'"
      bg-color="rgb(232,232,232,0.7)"
    ></up-loading-page>
  </view>
</template>

<style lang="scss" scoped>
.account-mana {
  width: 590rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 26rpx;
  gap: 50rpx;

  .platform-logo {
    width: 196rpx;
    height: 196rpx;
    background-color: rgba(126, 126, 94, 0.7);
    text-align: center;
    line-height: 196rpx;
    margin-top: 80rpx;
  }
  .bluetooth-wrapper {
    display: flex;
    gap: 30rpx;
    align-items: center;
    justify-content: center;
    .box {
      border-radius: 16rpx;
      border: 1px solid #000;
      padding: 16rpx;
      transition: 0.3s ease;
      &.off {
        color: $bg-color-orange;
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }

  .outlogin {
    margin: 0 auto;
    button {
      font-size: 28rpx;
      background-color: $bg-color-green;
      color: #000;
      width: 200rpx;
      padding: 5rpx 20rpx;
      border-radius: 80rpx;
      text-align: center;
      transition: 0.3s ease;
      &:active {
        opacity: 0.8;
        transform: scale(0.95);
      }
    }
  }
}
</style>
