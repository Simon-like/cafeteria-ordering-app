<script lang="ts" setup>
/**
 * @description 新增菜品信息页面
 * @author 应东林
 * @date 2024-09-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-24
 */

const back = () => {
  uni.navigateBack({
    delta: 1,
  })
}
</script>

<template>
  <view class="add-view">
    <custom-nav-bar></custom-nav-bar>
    <view class="section-header">
      <view class="title">新增菜品</view>
      <view class="back-btn" @click="back"><i class="iconfont icon-zuojiantou"></i></view>
    </view>
    <view class="basic-info section">
      <view class="section-title">基本信息</view>
      <view class="info-wrapper">
        <view class="info-line">
          <view class="line-title">菜品名称：</view>
          <view class="value">生蚝</view>
        </view>
        <view class="info-line">
          <view class="line-title">外送信息：</view>
          <view class="value">本店精品菜</view>
        </view>
        <view class="info-line">
          <view class="line-title">封面：</view>
          <view class="value">生蚝</view>
        </view>
        <view class="info-line">
          <view class="line-title">菜品定价：</view>
          <view class="value">生蚝</view>
        </view>
        <view class="info-line">
          <view class="line-title">菜品描述：</view>
          <view class="value">生蚝</view>
        </view>
      </view>
    </view>

    <view class="button-box">
      <view class="upload btn">提交</view>
    </view>
  </view>
</template>

<style lang="scss" scope>
.add-view {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45rpx 20rpx 0 20rpx;
  gap: 60rpx;
  .section-header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    .title {
      font-size: 50rpx;
      font-weight: 550;
      margin: 0 auto;
    }
    .back-btn {
      position: absolute;
      left: 10rpx;
      top: 0;
      padding: 10rpx;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 16rpx;
      font-weight: 550;
      transition: 0.2s ease;
      &:active {
        scale: 0.9;
      }
    }
  }
  .section {
    width: 100%;
    .section-title {
      margin-left: 20rpx;
      margin-bottom: 15rpx;
    }
    .info-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.1);
      gap: 40rpx;
      padding: 30rpx;
      .info-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .button-box {
    margin-top: 90rpx;
    width: 100%;
    display: flex;
    gap: 70rpx;
    justify-content: space-between;
    align-items: center;
    .btn {
      height: 80rpx;
      flex: 1;
      font-size: 45rpx;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 16rpx;
      font-weight: 550;
      transition: 0.2s ease;
      text-align: center;
      line-height: 80rpx;
      &:active {
        scale: 0.9;
      }
    }
  }
}
</style>
