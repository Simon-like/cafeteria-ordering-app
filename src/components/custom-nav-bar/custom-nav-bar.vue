<script setup lang="ts">
import { getTitleBarHeight, getStatusBarHeight, getNavBarHeight } from '@/utils/system'
</script>

<template>
  <view class="layout">
    <!-- 对于小程序有一个占位元素以避免和手机状态栏重叠 -->
    <!-- <view class="navbar">
      <view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
    </view> -->

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

    .statusBar {
    }

    .titleBar {
      display: flex;
      padding: 0 30rpx;
      align-items: center;

      .title {
        font-size: 22px;
        font-weight: 700;
      }
    }
  }
}
</style>
