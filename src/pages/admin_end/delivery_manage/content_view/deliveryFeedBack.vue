<script lang="ts" setup>
import { ref } from 'vue'
/**
 * @description 管理端外卖员模块
 * @author 钟礼豪
 * @date 2024-10-31
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-31
 */
interface Info {
  time: string
  type: string
  content: string
  imgs: string
  orderNumber: string
  diliver: string
  diliver_phone: string
  name: string
  contactPhone: string
  customer: string
  customer_phone: string
}
const tests = ref<Info>([
  {
    id: '1',
    time: '2024.10.20',
    type: '退款',
    content: '外卖丢失',
    imgs: 'http://img',
    orderNumber: 'aaa',
    diliver: 'xxx',
    diliver_phone: '123',
    name: 'xxx',
    contactPhone: '123',
    customer: 'xxx',
    customer_phone: '123',
  },
  {
    id: '2',
    time: '2024.10.21',
    type: '退款',
    content: '外卖丢失',
    imgs: 'http://img',
    orderNumber: 'aaa',
    diliver: 'xxx',
    diliver_phone: '123',
    name: 'xxx',
    contactPhone: '123',
    customer: 'xxx',
    customer_phone: '123',
  },
])

const popup = ref(null)
const selectedInfo = ref<Info>({})

const handleButtonClick = (info: Info) => {
  selectedInfo.value = info
  popup.value.open()
}

const hidePopup = () => {
  popup.value.close()
}
</script>
<template>
  <view class="box">
    <scroll-view scroll-y="true" class="scroll-Y">
      <view v-for="info in tests" :key="info.id" class="card">
        <view class="item">时间:{{ info.time }}</view>
        <view class="item">类型:申述-{{ info.type }}</view>
        <view class="item">内容:{{ info.content }}</view>
        <button @click="handleButtonClick(info)">处理</button>
      </view>
    </scroll-view>

    <uni-popup ref="popup" type="center">
      <view class="popup-content">
        <view class="content-item">时间: {{ selectedInfo.time }}</view>
        <view class="content-item">类型: {{ selectedInfo.type }}</view>
        <view class="content-item">申述说明: {{ selectedInfo.content }}</view>
        <view class="content-item">上传附件: </view>
        <view class="content-item" style="text-decoration: underline"
          >相关订单:{{ selectedInfo.orderNumber }}</view
        >
        <view class="content-item">
          <view class="contactInfo"
            ><text>外卖员:{{ selectedInfo.diliver }}</text
            ><button class="contact">联系外卖员</button></view
          >
          <view class="contactInfo"
            ><text>商家:{{ selectedInfo.name }}</text
            ><button class="contact">联系商家</button></view
          >
          <view class="contactInfo"
            ><text>用户:{{ selectedInfo.customer }}</text
            ><button class="contact">联系用户</button></view
          >
        </view>

        <!-- 可以继续添加更多信息 -->
        <button @click="hidePopup()" class="close">关闭</button>
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
    background-color: #ccc;
    .item {
      font-size: 26rpx;
      margin-bottom: 5rpx;
    }
    button {
      height: 60rpx;
      width: 140rpx;
      margin: auto;
      border: 2rpx solid #000;
      text-align: center;
      line-height: 60rpx;
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
    }
    .close {
      margin-top: 50rpx;
      width: 200rpx;
      height: 80rpx;
    }
  }
}
</style>
