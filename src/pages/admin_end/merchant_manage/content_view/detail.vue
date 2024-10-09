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
      <view class="back" @click="goBack">&lt;</view>
      <view class="title">店铺详情</view>
    </view>
    <view class="content">
      <view class="logo">
        <image :src="detail.logo" class="logo"></image>
      </view>
      <view class="info">
        <view class="name">{{ detail.name }}</view>
        <view class="businessHours">营业时间: {{ detail.businessHours }}</view>
        <view class="address">地址: {{ detail.address }}</view>
        <view class="contactPhone">联系电话: {{ detail.contactPhone }}</view>
        <view class="realName">所有人: {{ detail.realName }}</view>
        <view class="description">店铺简介: {{ detail.description }}</view>
      </view>
    </view>
    <view class="menu">店铺菜单功能</view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    padding: 20rpx;
    .back {
      margin-right: 20rpx;
    }
  }
  .content {
    display: flex;
    .logo {
      width: 200rpx;
      height: 200rpx;
    }
  }
  .info {
    flex-grow: 1;
    .menu {
      margin-top: 20rpx;
    }
  }
}
</style>
