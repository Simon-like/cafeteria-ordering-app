<script lang="ts" setup>
import { ref } from 'vue'
const value = ref<string>('')
</script>

<template>
  <view class="contact-customerservice">
    <uni-easyinput
      type="textarea"
      v-model="value"
      autoHeight
      placeholder="请输入您遇到的问题"
      :styles="{
        color: '#000',
        borderColor: '#7e7e5e',
      }"
      :placeholderStyle="'color:rgba(0, 0, 0, 0.5);font-size:14px'"
    ></uni-easyinput>
    <view class="sub-button">提交</view>
    <view class="text-area">
      <view class="line">
        如您的问题没有解决或客服没有在三个工作日内回复您，您可以选择以下方式联系：
      </view>
      <view class="line"> 客服电话：000-00000000 </view>
      <view class="line"> 客服微信：xxxxxxxxxxxxxx </view>
      <view class="line"> …… </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.contact-customerservice {
  width: 610rpx;
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
    margin-top: 46rpx;
    width: 166rpx;
    height: 46rpx;
    background-color: rgba(126, 126, 94, 0.7);
    line-height: 44rpx;
    text-align: center;
    transition: all 0.2s ease;

    &:active {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }

  .text-area {
    margin: 48rpx 30rpx 0 30rpx;
    font-size: 25rpx;
  }
}
</style>
