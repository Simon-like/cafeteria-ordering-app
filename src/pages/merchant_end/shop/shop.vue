<script lang="ts" setup></script>

<template>
  <view class="shop">
    <custom-nav-bar></custom-nav-bar>
    <HeaderBar />
    <view class="content"> </view>
  </view>
</template>

<style lang="scss" scoped>
.shop {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
