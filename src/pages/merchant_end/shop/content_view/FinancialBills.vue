<script lang="ts" setup>
import Header from '@/pages/merchant_end/shop/content_view/financialBills_components/Header.vue'
import OderItem from '@/pages/merchant_end/shop/content_view/financialBills_components/OderItem.vue'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'
import { getCompletedOrRefund } from '@/services/merchant/merchant_shop_order_api'
/**
 * @description 店铺管理财务信息管理
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-31
 */

type OrderItem = {
  orderId: number
  orderCode: string // 订单编号，有规定格式的一个编码
  orderTime: string
  payMethod: number // 支付方式，微信支付0，支付宝支付1
  actualPrice: number // 实际支付金额
  orderStatus: number //2->已支付;4->已退款;
}
const date_now = ref<string>('') //当前时间，依靠Header组件传递过来
const resOrder = ref<OrderItem[]>([]) //订单数组

// 获取时间信息
const onDate_selected = async (date: string) => {
  date_now.value = date
  await getOrder_loading()
}

// 加载订单数据
const getOrder_loading = async () => {
  const res = await getCompletedOrRefund(date_now.value, 4)
  if (res.code === 1) {
    resOrder.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: '加载订单数据失败！',
    })
  }
}
</script>

<template>
  <view class="financial-bills">
    <Header @date="onDate_selected" />
    <view class="main">
      <view class="line">
        <view>流水明细</view>
      </view>
      <view class="content">
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="line-none" v-show="resOrder.length === 0">暂时没有数据！</view>
          <OderItem v-for="item in resOrder" :key="item.orderId" :orderItem="item" />
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.financial-bills {
  width: 590rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50rpx 20rpx;
  font-size: 30rpx;
  white-space: nowrap;
  .line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20rpx;
  }
  .oderType-picker {
    vertical-align: middle;
    .iconfont {
      font-size: 20rpx;
      color: $text-color-green;
    }
  }
  .main {
    width: 100%;
    margin-top: 30rpx;
    padding: 20rpx 10rpx;
    background: $bg-color-light;
    .content {
      margin-top: 30rpx;
      width: 100%;
      height: 50vh;
      .scroll-Y {
        position: relative;
        .line-none {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 36rpx;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
