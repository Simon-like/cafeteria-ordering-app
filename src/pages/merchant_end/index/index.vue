<script setup lang="ts">
//
</script>

<template>
  <view class="index">
    <custom-nav-bar></custom-nav-bar>
    <HeaderBar />
    <view class="content">
      <view class="total-amount"> </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.index {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    padding: 60rpx 70rpx;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .total-amount {
      width: 600rpx;
      height: 310rpx;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
