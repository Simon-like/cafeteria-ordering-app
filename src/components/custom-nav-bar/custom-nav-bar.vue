<script setup lang="ts">
import { getTitleBarHeight, getStatusBarHeight, getNavBarHeight } from '@/utils/system.ts'

defineProps({
  title: {
    type: String,
    default: '壁纸',
  },
})
</script>

<template>
  <view class="layout">
    <!-- 对于小程序有一个占位元素以避免和手机状态栏重叠 -->
    <view class="navbar">
      <view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
      <view class="titleBar" :style="{ height: getTitleBarHeight() + 'px' }">
        <view class="title">{{ title }}</view>
        <view class="search">
          <uni-icons type="search" color="#888" size="18" class="icon"></uni-icons>
          <text class="text">搜索</text>
        </view>
      </view>
    </view>

    <view class="fill" :style="{ height: getNavBarHeight() + 'px' }"> </view>
  </view>
</template>

<style lang="scss" scoped>
.layout {
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background: linear-gradient(to bottom, transparent 0%, #fff 400rpx),
      linear-gradient(to right, #beecd8 20%, #f4e2d8);

    .statusBar {
    }

    .titleBar {
      display: flex;
      padding: 0 30rpx;
      align-items: center;

      .title {
        font-size: 22px;
        font-weight: 700;
        color: $text-font-color-1;
      }

      .search {
        width: 220rpx;
        height: 50rpx;
        border-radius: 60rpx;
        background: rgba(255, 255, 255, 0.4);
        border: 1px solid #fff;
        margin-left: 30rpx;
        color: #999;
        font-size: 28rpx;
        display: flex;
        align-items: center;

        .icon {
          margin-left: 5rpx;
        }

        .text {
          padding-left: 10rpx;
        }
      }
    }
  }
}
</style>
