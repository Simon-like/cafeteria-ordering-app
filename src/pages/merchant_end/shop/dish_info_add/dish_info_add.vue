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

const priceValue = ref<number>(0)
const priceMinus = () => {
  if (priceValue.value === 0) {
    uni.showToast({
      icon: 'none',
      title: '数量已经达到最小值',
    })
  } else {
    priceValue.value--
  }
}
const priceAdd = () => {
  priceValue.value++
}
const dish_feature = ref<string>('')
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
          <view class="value">单点不送</view>
        </view>
        <view class="info-line">
          <view class="line-title">封面：</view>
          <view class="value">生蚝</view>
        </view>
        <view class="info-line">
          <view class="line-title">菜品定价：</view>
          <view class="value">
            <view class="value number">
              <view class="minus" @click="priceMinus">-</view>
              <input type="number" class="inventory-input" v-model="priceValue" />
              <view class="add" @click="priceAdd">+</view>
            </view>
          </view>
        </view>
        <view class="info-line">
          <view class="line-title">菜品描述：</view>
        </view>
        <uni-easyinput
          type="textarea"
          v-model="dish_feature"
          autoHeight
          placeholder="请描述该菜品特征,以便管理员审核"
          :styles="{
            color: '#000',
            borderColor: '#7e7e5e',
            borderRadius: '20px',
            backgroundColor: 'rgba(255,255,255,0.4)',
          }"
          :placeholderStyle="'color:rgba(0, 0, 0, 0.5);font-size:14px'"
        ></uni-easyinput>
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

        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8rpx;
          .minus,
          .add {
            width: 30rpx;
            height: 30rpx;
            font-size: 30rpx;
            text-align: center;
            line-height: 30rpx;
            border-radius: 50%;
            color: rgba(0, 0, 0, 0.3);
            font-weight: blod;
            background-color: #fff;
            transition: 0.2s ease;
            &:active {
              scale: 0.95;
            }
          }
          input {
            outline: none;
            width: 80rpx;
            background: transparent;
            border-bottom: 1px solid #fff;
            text-align: center;
          }
        }
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
