<script lang="ts" setup>
/**
 * @description 财务管理模块-订单组件
 * @author 应东林
 * @date 2024-10-27
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-27
 */
</script>

<template>
  <view class="oder-item">
    <view class="line">
      <view class="title">订单编号:DSDF1354125452</view>
      <view class="status">已支付</view>
    </view>
    <view class="line">
      <view class="title">订单金额:77.2</view>
    </view>
    <view class="line">
      <view class="title">支付方式:微信支付</view>
    </view>
    <view class="line">
      <view class="title">支付时间:xxx:xx:xx</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.oder-item {
  width: 100%;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  font-size: 30rpx;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.2);
  gap: 16rpx;
  margin-bottom: 30rpx;
  .line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
