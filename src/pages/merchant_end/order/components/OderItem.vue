<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { debounce, splitContent } from '@/composables/tools'
/**
 * @description 订单管理模块-订单组件
 * @author 应东林
 * @date 2024-10-25
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-25
 */

// 假数据
const dishSpecList = ref<string[]>(['大份', '清蒸', '加醋', '加醋', '加醋', '加醋'])

const show = ref<boolean>(false)
const onDescShow = () => {
  show.value = !show.value
}
</script>

<template>
  <view class="oder-item">
    <view class="line oder-header">
      <view class="x-wrapper">
        <view class="oder-number">#1</view>
        <view class="oder-type">外卖</view>
      </view>
      <view class="x-wrapper">
        <view class="btn">接单</view>
        <view class="btn" v-if="false">完成</view>
        <view class="btn" v-if="false">取消</view>
        <view class="btn" v-if="false">恢复</view>
        <view class="btn" v-if="false">确认退款</view>
        <view v-if="false">已完成</view>
        <view v-if="false">已退款</view>
      </view>
    </view>
    <view class="line oder-customer">
      <view class="x-wrapper">
        <view class="customer">王先生</view>
        <view class="address" v-if="true">家属四公寓-1202</view>
      </view>
    </view>
    <view class="line order-notes">
      <view class="Notes">微辣啊啊啊啊啊啊啊\n哈哈哈</view>
    </view>
    <view class="menu-box">
      <view class="menu-line" v-for="line in 3">
        <view class="y-wrapper">
          <view class="disha-name" style="align-self: start">好大的乳山生蚝</view>
          <view class="dishSpecList" style="align-self: start">
            <view class="dishSpecItem" v-for="item in dishSpecList">{{ item }}</view>
          </view>
        </view>
        <view class="dish-number">x12</view>
        <view class="dish-price">60元</view>
      </view>
    </view>
    <view class="HIDDEN-box" :class="{ 'content-show': show }">
      <view class="inner">
        <view class="remaining menu-box">
          <view class="menu-line" v-for="line in 2">
            <view class="y-wrapper">
              <view class="disha-name" style="align-self: start">好大的乳山生蚝</view>
              <view class="dishSpecList" style="align-self: start">
                <view class="dishSpecItem" v-for="item in dishSpecList">{{ item }}</view>
              </view>
            </view>
            <view class="dish-number">x12</view>
            <view class="dish-price">60元</view>
          </view>
        </view>
        <view class="oder-info-box">
          <view class="dish-info">
            <view class="totalPrice">菜品总价：60元</view>
            <view class="coupon">-优惠券：6元</view>
            <view class="actualPrice"
              >共计支付：<text style="font-weight: 550; font-size: 40rpx">53.21</text>元</view
            >
          </view>
          <view class="remaining-info">
            <view class="phoneNumber">顾客电话：16623819144</view>
            <view class="orderTime">下单时间：</view>
            <view class="payMethod">支付方式：微信支付</view>
            <view class="orderCode">订单编号：#SDF546546854</view>
          </view>
        </view>
      </view>
    </view>
    <view @click="onDescShow()" class="icon" :class="{ 'icon-show': show }">
      <i class="iconfont icon-jiantouarrow483"></i>
    </view>
  </view>
</template>

<style lang="scss" scope>
.oder-item {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  font-size: 25rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10rpx;
  padding: 20rpx;
  margin-bottom: 25rpx;
  .btn {
    text-align: center;
    transition: 0.2s ease;
    font-size: 30rpx;
    border: 1px solid #000;
    padding: 10rpx;
    width: 115rpx;
    &:active {
      scale: 0.95;
    }
  }
  .x-wrapper {
    display: flex;
    align-items: center;
    gap: 15rpx;
  }
  .y-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15rpx;
  }
  .line {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .oder-header {
    .oder-number {
      font-size: 36rpx;
      font-weight: 550;
    }
  }
  .menu-box {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20rpx;
    .menu-line {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 20rpx;
      white-space: nowrap;
      border: 1px solid #000;
      padding: 15rpx;
    }
    .dishSpecList {
      width: 75%;
      display: flex;
      align-items: center;
      gap: 10rpx;
      flex-wrap: wrap;
      .dishSpecItem {
        border: 1px solid rgb(0, 0, 0);
        border-radius: 16rpx;
        padding: 5rpx;
        white-space: nowrap;
      }
    }
  }

  .icon {
    width: 100%;
    text-align: center;
    transition: 0.3s ease-out;
  }

  .HIDDEN-box {
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s ease-out;
    .inner {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15rpx;
      overflow: hidden;
    }
  }
  .oder-info-box {
    border-top: 1px solid #000;
    padding: 15rpx 0;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 15rpx;
    .dish-info {
      align-self: flex-end;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      gap: 15rpx;
    }
    .remaining-info {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 15rpx;
    }
  }

  .icon-show {
    transform: rotate(180deg);
  }

  .content-show {
    grid-template-rows: 1fr;
  }
}
</style>
