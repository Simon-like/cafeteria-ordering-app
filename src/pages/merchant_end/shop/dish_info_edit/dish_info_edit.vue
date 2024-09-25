<script lang="ts" setup>
import { ref } from 'vue'
/**
 * @description 菜品信息修改页面
 * @author 应东林
 * @date 2024-09-23
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-25
 */

const back = () => {
  uni.navigateBack({
    delta: 1,
  })
}

const inventoryValue = ref<number>(0)
const inventoryMinus = () => {
  if (inventoryValue.value === 0) {
    uni.showToast({
      icon: 'none',
      title: '数量已经达到最小值',
    })
  } else {
    inventoryValue.value--
  }
}
const inventoryAdd = () => {
  inventoryValue.value++
}

const priceValue = ref<number>(0)
const priceMinus = () => {
  if (priceValue.value === 0) {
    uni.showToast({
      icon: 'none',
      title: '定价已经达到最小值',
    })
  } else {
    priceValue.value--
  }
}
const priceAdd = () => {
  priceValue.value++
}

const discountValue = ref<number>(0.1)
const discountMinus = () => {
  if (discountValue.value === 0.1) {
    uni.showToast({
      icon: 'none',
      title: '折扣已经达到最小值',
    })
  } else {
    discountValue.value -= 0.05
    discountValue.value = +discountValue.value.toFixed(2)
  }
}
const discountAdd = () => {
  if (discountValue.value === 1) {
    uni.showToast({
      icon: 'none',
      title: '折扣已经达到最大值',
    })
  } else {
    discountValue.value += 0.05
    discountValue.value = +discountValue.value.toFixed(2)
  }
}

const limitDecimalPlaces = () => {
  discountValue.value = +discountValue.value.toFixed(2)
}
</script>

<template>
  <view class="edit-view">
    <custom-nav-bar></custom-nav-bar>
    <view class="section-header">
      <view class="title">信息设置</view>
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
          <view class="value number">
            <view class="minus" @click="inventoryMinus">-</view>
            <input type="number" class="inventory-input" v-model="inventoryValue" />
            <view class="add" @click="inventoryAdd">+</view>
          </view>
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
          <view class="value number">
            <view class="minus" @click="priceMinus">-</view>
            <input type="number" class="inventory-input" v-model="priceValue" />
            <view class="add" @click="priceAdd">+</view>
          </view>
        </view>

        <view class="info-line status-line">
          <view class="status">状态：审核通过</view>
          <view class="btn">确认提交</view>
        </view>

        <view class="info-line">
          <view class="line-title">折扣设置：</view>
          <view class="value number">
            <view class="minus" @click="discountMinus">-</view>
            <input
              type="number"
              class="inventory-input"
              v-model="discountValue"
              @input="limitDecimalPlaces"
            />
            <view class="add" @click="discountAdd">+</view>
          </view>
        </view>

        <view class="info-line">
          <view class="discountPrice">折后价:{{ (priceValue * discountValue).toFixed(2) }}</view>
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
      background-color: rgba(0, 0, 0, 0.3);
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

        .discountPrice {
          margin-left: auto;
          color: rgba(0, 0, 0, 0.2);
        }

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

      .status-line {
        margin-top: -30rpx;
      }
      .status {
        width: 200rpx;
        background-color: #fff;
        border-radius: 16rpx;
        font-size: 25rpx;
        white-space: nowrap;
        text-align: center;
        padding: 5rpx;
      }
      .btn {
        width: 200rpx;
        text-align: center;
        padding: 5rpx;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 16rpx;
        transition: 0.2s ease;
        &:active {
          scale: 0.95;
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
