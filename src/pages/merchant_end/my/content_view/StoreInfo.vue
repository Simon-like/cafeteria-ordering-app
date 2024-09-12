<script lang="ts" setup>
import { ref } from 'vue'
type StoreInfo = {
  logo: string
  name: string
  address: string
  phone: string
  time: string
  owner: string
  desc: string
}
const store_info = ref<StoreInfo>({
  logo: '../../../static/images/logo_icon.png',
  name: 'simon火锅店',
  address: '西蒙大街202号',
  phone: '16623819144',
  time: '9:00-22:00',
  owner: 'simon',
  desc: '无',
})
</script>

<template>
  <view class="store-info">
    <view class="store-logo">
      <text>店铺logo:</text>
      <image :src="store_info.logo" mode="aspectFill" class="logo"></image>
    </view>
    <view class="store-name">店铺名称: {{ store_info.name }}</view>
    <view class="store-address">店铺地址: {{ store_info.address }}</view>
    <view class="contact-number">联系电话: {{ store_info.phone }}</view>
    <view class="opening-hours">营业时间: {{ store_info.time }}</view>
    <view class="owner">所有人: {{ store_info.owner }}</view>
    <view class="store-introduction">
      <text>店铺简介: </text>
      <view class="description">
        {{ store_info.desc }}
      </view>
    </view>

    <view class="edit-button"> 修改资料 </view>
  </view>
</template>

<style lang="scss" scoped>
.store-info {
  width: 635rpx;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 26rpx;
  gap: 36rpx;
  padding: 20rpx 16rpx;
  font-size: 30rpx;

  .store-logo {
    display: flex;
    gap: 26rpx;
    .logo {
      width: 170rpx;
      height: 170rpx;
      border: 2px solid rgba(0, 0, 0, 0.5);
    }
  }

  .edit-button {
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
