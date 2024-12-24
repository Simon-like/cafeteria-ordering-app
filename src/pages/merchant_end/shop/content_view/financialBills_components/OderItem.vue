<script lang="ts" setup>
/**
 * @description 财务管理模块-订单组件
 * @author 应东林
 * @date 2024-10-27
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-1
 */
type OrderItem = {
  orderId: number
  orderCode: string // 订单编号，有规定格式的一个编码
  orderTime: string
  payMethod: number // 支付方式，微信支付0，支付宝支付1
  actualPrice: number // 实际支付金额
  orderStatus: number //2->已支付;4->已退款;
}

// 传递的数据
const props = defineProps<{
  orderItem: OrderItem
}>()
</script>

<template>
  <view class="oder-item">
    <view class="line">
      <view class="title">订单编号:{{ props.orderItem.orderCode }}</view>
      <view class="status">{{ props.orderItem.orderStatus === 8 ? '已退款' : '已支付' }}</view>
    </view>
    <view class="line">
      <view class="title">订单金额:{{ props.orderItem.actualPrice }}</view>
    </view>
    <view class="line">
      <view class="title"
        >支付方式:{{ props.orderItem.payMethod ? '支付宝支付' : '微信支付' }}</view
      >
    </view>
    <view class="line">
      <view class="title"
        >支付时间:{{
          props.orderItem.orderTime.split('T').reduce((res, item) => res + '  ' + item)
        }}</view
      >
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
  background: #fff;
  border-radius: 10rpx;
  border: 1px solid $text-color-green;
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
