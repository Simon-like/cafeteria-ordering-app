<script lang="ts" setup>
import { ref } from 'vue'
import { contactService } from '@/services/merchant/merchant_api'
const content = ref<string>('')

const onSubmit = async () => {
  const res = await contactService(content.value)
  if (res.code === 1) {
    uni.showToast({
      icon: 'success',
      title: '发送成功！',
    })
  } else {
    uni.showToast({
      icon: 'success',
      title: '发送失败！',
    })
  }
}
</script>

<template>
  <view class="contact-customerservice">
    <uni-easyinput
      type="textarea"
      v-model="content"
      autoHeight
      placeholder="请输入您遇到的问题"
      :styles="{
        color: '#000',
        borderColor: '#7e7e5e',
      }"
      :placeholderStyle="'color:rgba(0, 0, 0, 0.5);font-size:14px'"
    ></uni-easyinput>
    <view class="sub-button"><button @click="onSubmit">提交</button></view>
    <view class="text-area">
      <view class="line">
        如您的问题没有解决或客服没有在三个工作日内回复您，您可以选择以下方式联系：
      </view>
      <view class="line"> 客服电话：000-00000000 </view>
      <view class="line"> 客服微信：xxxxxxxxxxxxxx </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.contact-customerservice {
  width: 590rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 26rpx;
  gap: 36rpx;
  padding: 30rpx 16rpx;
  font-size: 30rpx;
  .uni-easyinput {
    width: 100%;
  }
  :deep() {
    .uni-easyinput {
      width: 500rpx;
      height: 257rpx;
      flex: 0;

      .is-input-border {
        border-radius: 0;
      }
    }
  }

  .sub-button {
    margin: 0 auto;
    button {
      font-size: 28rpx;
      background-color: $bg-color-green;
      color: #000;
      width: 200rpx;
      padding: 3rpx 10rpx;
      border-radius: 80rpx;
      text-align: center;
      &:active {
        opacity: 0.8;
        transform: scale(0.95);
      }
    }
  }

  .text-area {
    margin: 48rpx 30rpx 0 30rpx;
    font-size: 25rpx;
    color: #ccc;
  }
}
</style>
