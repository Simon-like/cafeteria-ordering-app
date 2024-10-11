<script setup lang="ts">
import { ref } from 'vue'
interface DetailInfo {
  logo: string
  name: string
  businessHours: string
  address: string
  contactPhone: string
  realName: string
  description: string
}

const detail = ref<DetailInfo>({} as DetailInfo)

const onLoad = (options: any) => {
  // 从页面传过来的参数
  const index = parseInt(options.index)
  detail.value = (window as any).$root.testInfo.dishList[index]
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<template>
  <view class="container">
    <custom-nav-bar></custom-nav-bar>
    <view class="header">
      <view class="back-btn" @click="goBack()"><i class="iconfont icon-zuojiantou"></i></view>
      <view class="title">区域商家详细信息</view>
    </view>

    <view class="info">
      <view class="info-item"
        ><image :src="detail.logo" class="logo"></image>
        <view class="name">店铺名称：{{ detail.name }}</view></view
      >
      <view class="info-item">营业时间: {{ detail.businessHours }}</view>
      <view class="info-item">地址: {{ detail.address }}</view>
      <view class="info-item">联系电话: {{ detail.contactPhone }}</view>
      <view class="info-item">所有人: {{ detail.realName }}</view>
      <view class="info-item">店铺简介: {{ detail.description }}</view>
      <view class="info-item">店铺菜单:<navigator class="nav">点击跳转</navigator></view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  font-size: 30rpx;
  .header {
    height: 40rpx;
    width: 100%;
    .back-btn {
      position: absolute;
      left: 10rpx;
      top: 60rpx;
      padding: 10rpx;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 16rpx;
      font-weight: 550;
      transition: 0.2s ease;
      &:active {
        scale: 0.9;
      }
    }
    .title {
      position: absolute;
      top: 65rpx;
      left: 70rpx;
      font-size: 35rpx;
      text-align: center;
    }
  }
  .info {
    .info-item {
      margin-top: 20rpx;
      margin-bottom: 15rpx;
      margin-left: 30rpx;
      display: flex;
      .logo {
        width: 200rpx;
        height: 200rpx;
        background-color: #123;
      }
      .name {
        font-size: 30rpx;
      }
      .nav {
        text-decoration: underline;
      }
    }
  }
}
</style>
