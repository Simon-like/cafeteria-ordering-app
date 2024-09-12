<script lang="ts" setup>
import { ref } from 'vue'
const value = ref<string>('simon')
const range = [
  { value: 0, text: '篮球' },
  { value: 1, text: '足球' },
  { value: 2, text: '游泳' },
]
</script>

<template>
  <view class="contact-customerservice">
    <uni-easyinput
      type="textarea"
      autoHeight
      v-model="value"
      placeholder="请输入内容"
    ></uni-easyinput>
    <view class="sub-button">提交</view>
  </view>
</template>

<style lang="scss" scoped>
.contact-customerservice {
  width: 635rpx;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 26rpx;
  gap: 36rpx;
  padding: 28rpx 16rpx;
  font-size: 30rpx;
  .uni-easyinput {
    width: 100%;
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
}
</style>
