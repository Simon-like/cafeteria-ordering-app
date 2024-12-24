<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import type { ReviewsType } from '@/types/merchant_return'
/**
 * @description 评价卡片
 * @author 应东林
 * @date 2024-11-10
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-22
 */
// 传递的数据
const props = defineProps<{
  ReviewsInfo: ReviewsType
}>()
const ReviewsInfo = props.ReviewsInfo
const is_show = ref<boolean>(false)
</script>

<template>
  <view class="card y-wrapper">
    <view class="x-wrapper header-line">
      <view class="customer-info x-wrapper">
        <up-avatar :src="'static/images/car.png'"></up-avatar>
        <view class="y-wrapper">
          <view class="customer">{{ ReviewsInfo.customer }}</view>
          <view class="date">{{ ReviewsInfo.date }}</view>
        </view>
      </view>
      <up-rate
        active-color="#EED814"
        inactive-color="#EED814"
        gutter="4"
        v-model="ReviewsInfo.Scoring"
        readonly
      ></up-rate>
    </view>
    <view class="content">{{ ReviewsInfo.content }}</view>
    <view class="btn">回复</view>

    <!-- 评价隐藏信息 -->
    <view class="reviews-content-wrapper" :class="{ show: is_show }">
      <view class="fn-content">
        <view class="inner y-wrapper">
          <view class="orderCode">订单编号:{{ ReviewsInfo.orderCode }}</view>
          <view class="phoneNumber">用户电话:{{ ReviewsInfo.phoneNumber }}</view>
        </view>
      </view>
    </view>
    <view @click="is_show = !is_show" class="icon" :class="{ show: is_show }">
      <i class="iconfont icon-jiantou_xia"></i>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card {
  background: $bg-color-light;
  margin-bottom: 20rpx;
  font-size: 26rpx;
  padding: 20rpx;
  .header-line {
    justify-content: space-between;
    margin-bottom: 20rpx;
    .customer-info {
      gap: 10rpx;
      .y-wrapper {
        gap: 16rpx;
        align-items: flex-start;
        white-space: nowrap;
        .customer {
          font-size: 26rpx;
          font-weight: 550;
        }
        .date {
          font-size: 20rpx;
          color: $text-color-green;
        }
      }
    }
  }

  .content {
    width: 100%;
    text-indent: 52rpx;
    white-space: wrap;
    margin-bottom: 20rpx;
  }
  .btn {
    align-self: flex-end;
    border-radius: 30rpx;
    color: $text-color-green;
    padding: 6rpx 40rpx;
    border: 1px solid $text-color-green;
    transition: all 0.3s ease;
    &:active {
      scale: 0.95;
    }
  }
}

// 卡片隐藏信息
.reviews-content-wrapper {
  margin-top: 20rpx;
  width: 100%;

  .fn-content {
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s ease-out;
    padding: 10rpx;
    .inner {
      width: 100%;
      overflow: hidden;
      gap: 10rpx;
      align-items: flex-start;
    }
  }

  &.show .fn-content {
    border-top: 1px solid $text-color-green;
    grid-template-rows: 1fr;
  }
}

.icon {
  width: 100%;
  text-align: center;
  transition: 0.3s ease-out;
  color: #b1caae;
  &.show {
    transform: rotate(180deg);
  }
}

.x-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}
.y-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
