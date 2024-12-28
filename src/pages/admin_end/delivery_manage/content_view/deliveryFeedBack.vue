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

const tests = ref<FeedBackInfo[]>()
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
        <view class="btns">
          <button @click="handleAudit(true, selectedInfo.id)">同意</button>
          <button @click="handleAudit(false, selectedInfo.id)">不同意</button>
        </view>

        <button @click="hidePopup()" class="close">关闭</button>
      </view>
    </uni-popup>

    <!-- 新增手机号弹窗 -->
    <uni-popup ref="phonePopup" type="center">
      <view class="phone-popup-content">
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
    margin: 15rpx;
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
    border-radius: 20rpx; // 添加圆角
    margin-left: 120rpx;
    width: 500rpx;
    padding: 20rpx; // 调整内边距
    .content-item {
      margin-top: 20rpx;
      margin-left: 15rpx;
      font-size: 24rpx;
    }

    .contactInfo {
      width: 100%;
      margin-right: 40rpx;
      display: flex;
      right: 340rpx;
      margin-bottom: 20rpx;
      justify-content: space-between;
      .contact {
        font-size: 20rpx;
        width: 120rpx;
        height: 50rpx;
        padding: 0;
      }
    }

    // 审核按钮放在同一行
    .btns {
      display: flex;
      gap: 20rpx; // 两个按钮之间的间隙
      margin-top: 20rpx;
      button {
        width: auto;
        height: 60rpx;
        font-size: 24rpx;
      }
    }

    .close {
      margin-top: 20rpx;
      width: 200rpx;
      height: 70rpx;
    }
  }

  // 手机号弹窗样式
  .phone-popup-content {
    position: absolute;
    bottom: 150rpx; // 距离屏幕底部150rpx
    left: 50%;
    transform: translateX(-50%);
    width: 300rpx;
    background-color: #fff;
    border-radius: 20rpx 20rpx 0 0; // 顶部圆角，底部平直
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); // 底部阴影
    padding: 20rpx;
    .content-item {
      font-size: 24rpx;
      text-align: center;
    }
    .close {
      margin-top: 20rpx;
      width: 100rpx;
      height: 60rpx;
    }
  }
}
</style>
