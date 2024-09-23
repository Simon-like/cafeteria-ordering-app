<script lang="ts" setup>
/**
 * @description 菜品信息修改页面
 * @author 应东林
 * @date 2024-09-23
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-23
 */

const back = () => {
  uni.navigateBack({
    delta: 1,
  })
}
</script>

<template>
  <view class="edit-view">
    <custom-nav-bar></custom-nav-bar>
    <view class="section-header">
      <view class="title">基本信息</view>
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
          <view class="line-title">菜品分组：</view>
          <view class="value">本店精品菜</view>
        </view>
        <view class="info-line">
          <view class="line-title">今日库存：</view>
          <view class="value">生蚝</view>
        </view>
        <view class="info-line">
          <view class="line-title">外送信息：</view>
          <view class="value">生蚝</view>
        </view>
        <view class="info-line">
          <view class="line-title">封面：</view>
          <view class="value">生蚝</view>
        </view>
      </view>
    </view>
    <view class="price-info section">
      <view class="section-title">价格信息</view>
      <view class="info-wrapper">
        <view class="info-line">
          <view class="line-title">菜品定价：</view>
          <view class="value">15.9</view>
        </view>
        <view class="info-line">
          <view class="line-title">折扣设置：</view>
          <view class="value">0.75</view>
        </view>
      </view>
    </view>
    <view class="spec-info section">
      <view class="section-title">规格信息</view>
      <view class="info-wrapper">
        <view class="info-line">
          <view class="line-title">规格设置：</view>
          <view class="value">15.9</view>
        </view>
      </view>
    </view>

    <view class="button-box">
      <view class="save btn">保存</view>
      <view class="discontinued btn">下架</view>
    </view>
  </view>
</template>

<style lang="scss" scope>
.edit-view {
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
      background-color: rgba(0, 0, 0, 0.2);
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
