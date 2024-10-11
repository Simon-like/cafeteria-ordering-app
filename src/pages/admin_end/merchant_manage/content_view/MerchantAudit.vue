<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const approve = () => {
  console.log('通过')
}

const reject = () => {
  console.log('不通过')
}
</script>
<template>
  <view class="box">
    <view class="content">
      <view class="logo">
        <image>logo</image>
      </view>
      <view class="info">
        <view class="info-item"> 名称: </view>
        <view class="info-item"> 地址: </view>
        <view class="info-item"> 联系方式: </view>
        <view class="else" v-show="isExpanded">
          <view class="info-item"> 营业时间: </view>
          <view class="info-item"> 所有人: </view>
          <view class="info-item"> 店铺简介: </view>
          <view class="btn"
            ><button @click="approve">通过</button><button @click="reject">不通过</button></view
          >
        </view>
        <view class="iconbox" @click="toggleExpand">
          <i class="icon" :class="isExpanded ? 'upicon' : 'downicon'"></i>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  background-color: #ccc;
  .content {
    .logo {
      background-color: #123;
      margin-top: 10rpx;
      margin-left: 10rpx;
      width: 180rpx;
      height: 180rpx;
      object-fit: cover;
    }
    .info {
      width: 50%;
      font-size: 30rpx;
      position: absolute;
      top: 170rpx;
      left: 320rpx;
      .info-item {
        margin-left: 10rpx;
        margin-bottom: 25rpx;
      }
      .else {
        .btn {
          height: 55rpx;
          display: flex;
          margin-bottom: 20rpx;
          button {
            float: right;
            width: 90rpx;
            padding: 0;
            font-size: 20rpx;
            border: 2rpx solid #000;
            background-color: transparent; /* 设置背景色为透明 */
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .iconbox {
        width: 50%;
        margin-left: 25%;
        .icon {
          display: inline-block;
          width: 40rpx;
          height: 30rpx;
          background-color: black;
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
          transition: transform 0.3s ease;
        }

        .upicon {
          transform: rotate(0deg); /* 向上箭头 */
        }

        .downicon {
          transform: rotate(180deg); /* 向下箭头 */
        }
      }
    }
  }
}
</style>
