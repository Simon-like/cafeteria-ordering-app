<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { diliver_courier, courier_audit } from '@/services/admin/delivery_manage'
import type { FeedBackInfo } from '@/types/admin_return'

/**
 * @description 管理端外卖员模块
 * @author 钟礼豪
 * @date 2024-10-31
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-31
 */

const tests = ref<FeedBackInfo[]>([
  {
    id: 1,
    appealContent: '外卖延迟，顾客投诉。',

    orderNumber: 'ORD12345678',
    courierName: '张三',
    merchantName: '麦当劳',

    customer: '李四',
    customerPhone: '13812345678', // 用户手机号
    courierId: 101,
    appealTime: '2024-10-20 10:30:00',
  },
  // ... 其他数据
])
const handleGetInfo = async () => {
  const res = await diliver_courier()
  tests.value = res.data
  console.log(res.data)
}
onMounted(handleGetInfo)

const handleAudit = async (flag: boolean, id: number) => {
  const res = await courier_audit(flag, id)
  console.log(res.data)
}

const popup = ref(null)
const phonePopup = ref(null) // 新增手机号弹窗的引用
const selectedInfo = ref<FeedBackInfo>()

// 处理弹窗打开
const handleButtonClick = (info: FeedBackInfo) => {
  selectedInfo.value = info
  popup.value.open()
}

// 新增手机号处理弹窗
const handlePhoneButtonClick = (phoneNumber: string) => {
  // 在手机号弹窗中展示手机号
  selectedInfo.value = { ...selectedInfo.value, phoneNumber }
  phonePopup.value.open()
}

const hidePopup = () => {
  popup.value.close()
}

const hidePhonePopup = () => {
  phonePopup.value.close()
}
</script>
<template>
  <view class="box">
    <scroll-view scroll-y="true" class="scroll-Y">
      <view v-for="info in tests" :key="info.id" class="card">
        <view class="item">时间:{{ info.appealTime }}</view>
        <view class="item">类型:申述</view>
        <view class="item">内容:{{ info.appealContent }}</view>
        <button @click="handleButtonClick(info)">处理</button>
      </view>
    </scroll-view>

    <!-- 处理申述的原始弹窗 -->
    <uni-popup ref="popup" type="center">
      <view class="popup-content">
        <view class="content-item">时间: {{ selectedInfo.appealTime }}</view>
        <view class="content-item">类型: 外卖员申述</view>
        <view class="content-item">申述说明: {{ selectedInfo.appealContent }}</view>
        <view class="content-item">上传附件: </view>
        <view class="content-item" style="text-decoration: underline">
          相关订单:{{ selectedInfo.orderNumber }}
        </view>
        <view class="content-item">
          <view class="contactInfo">
            <text>外卖员:{{ selectedInfo.courierName }}</text>
            <button class="contact" @click="handlePhoneButtonClick(selectedInfo.courierPhone)">
              联系外卖员
            </button>
          </view>
          <view class="contactInfo">
            <text>商家:{{ selectedInfo.merchantName }}</text>
            <button class="contact" @click="handlePhoneButtonClick(selectedInfo.merchantPhone)">
              联系商家
            </button>
          </view>
          <view class="contactInfo">
            <text>用户:{{ selectedInfo.customer }}</text>
            <button class="contact" @click="handlePhoneButtonClick(selectedInfo.customerPhone)">
              联系用户
            </button>
          </view>
        </view>
        <!-- 审核按钮 -->
        <button @click="handleAudit(true, selectedInfo.id)">同意</button>
        <button @click="handleAudit(false, selectedInfo.id)">不同意</button>
        <button @click="hidePopup()" class="close">关闭</button>
      </view>
    </uni-popup>

    <!-- 新增手机号弹窗 -->
    <uni-popup ref="phonePopup" type="center">
      <view class="popup-content">
        <view class="content-item">手机号: {{ selectedInfo.phoneNumber }}</view>
        <button @click="hidePhonePopup()" class="close">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>
<style lang="scss" scoped>
.box {
  display: flex;
  width: 590rpx;
  flex-direction: column;
  .card {
    margin: 15rpx 15rpx 15rpx 15rpx;
    display: flex;
    flex-direction: column;
    padding: 15rpx;
    background-color: $bg-color-light;
    .item {
      font-size: 26rpx;
      margin-bottom: 5rpx;
    }
    button {
      height: 60rpx;
      width: 140rpx;
      margin: auto;
      background-color: $bg-color-green;
      text-align: center;
      line-height: 60rpx;
      margin-top: 10rpx;
    }
  }

  .popup-content {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-left: 120rpx;
    width: 500rpx;
    height: 1000rpx;
    padding-top: 10rpx;
    .content-item {
      margin-top: 40rpx;
      margin-left: 15rpx;
      display: flex;
      flex-direction: column;
      font-size: 24rpx;
    }

    .contactInfo {
      display: flex;
      margin-right: auto;
      margin-bottom: 40rpx;
      button {
        position: absolute;
        font-size: 20rpx;
        width: 200rpx;
        height: 60rpx;
        padding: 0;
        right: 0;
      }
    }

    .close {
      margin-top: 50rpx;
      width: 200rpx;
      height: 80rpx;
    }
  }
}
</style>
