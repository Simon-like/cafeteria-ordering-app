<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { debounce, splitContent, getLastDays, throttle, formatDate } from '@/composables/tools'
import type { OrderItem, MenuItem, specItem, dishData } from '@/types/merchant_return'
import {
  confirmTheOrder,
  completeOrder,
  refundsConfirmedOrders,
} from '@/services/merchant/merchant_shop_order_api'
import { writeBLEValueLoop, closeBluetooth } from '@/utils/BluetoothAdapter'
import { Printer } from '@/utils/ble/Printer'
import { useMerchantOrderStore, useMerchantPagesStore } from '@/stores'
// 本地订单数据
const OrderStore = useMerchantOrderStore()

const MerchantPages = useMerchantPagesStore()
/**
 * @description 订单管理模块-订单组件
 * @author 应东林
 * @date 2024-10-25
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-25
 */

// 传递的数据
const props = defineProps<{
  orderItem: OrderItem
}>()
const orderData = props.orderItem
//处理后端奇怪的空数组！
orderData.menu = orderData.menu.map((item) => {
  if (!item.dishSpecList[0]) {
    item.dishSpecList = []
    return item
  } else return item
})
orderData.orderTime = orderData.orderTime.split('T').reduce((arr, index) => arr + '  ' + index)
orderData.menu.forEach((item, index, arr) => {
  let arr_temp = []
  arr_temp = item.dishSpecList.filter((value) => !!value && value !== 'null')
  arr[index].dishSpecList = arr_temp
})
const show = ref<boolean>(false)
const onDescShow = () => {
  show.value = !show.value
}

// 打印
const BLEPrint = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const menu = orderData.menu.map((item) => [
        item.dishName +
          (item.dishSpecList.length !== 0
            ? '(' + item.dishSpecList.reduce((res, index) => res + ',' + index) + ')'
            : ''),
        'x' + item.dishNumber,
        item.dishPrice + '元',
      ])

      const buffer = new Printer()
        .setAlign('ct') // 设置居中打印标题
        .setSize(1, 2)
        .print('订单详情')

        // 打印分割线
        .setAlign('lt')
        .setSize(1, 1)
        .printFill()

        // 打印订单号
        .setSize(1, 1)
        .printLR('订单号:', orderData.orderCode)
        // 打印顾客信息
        .printLR('顾客:', orderData.customer)
        .printLR('电话:', orderData.phoneNumber)
        .printLR('下单时间:', orderData.orderTime)
        .setSize(2, 2)
        // 打印备注
        .print('备注:' + orderData.orderNotes)
        .setSize(1, 1)
        .printFill()
        .setSize(1, 2)
        // 打印菜品信息
        .setAlign('lt')
        .printLoop(menu)
        .setSize(1, 1)
        // 打印总价、优惠、实际支付金额
        .printLR('总价:', orderData.totalPrice + '元')
        .printLR('优惠:', orderData.coupon + '元')
        .printLR('实付:', orderData.actualPrice + '元')
        .printLR('可提现金额:', orderData.withDrawableAmount + '元')

        // 打印送餐地址信息
        .printFill()
        .printLR(
          '送餐地址:',
          orderData.address ? orderData.address + `  ${orderData.addressNumber}` : '堂食订单',
        )

        // 打印支付方式（假设 0 是现金支付）
        .printLR('支付方式:', orderData.payMethod === 0 ? '微信支付' : '支付宝支付')

        // 打印时间
        .printFill()
        .printLR('打印时间：', formatDate('yyyy-MM-dd hh:mm:ss'))
        // 打印空行
        .println()
        // 结束打印
        .end()

      writeBLEValueLoop(buffer, MerchantPages.RWInfo).then((res) => {
        setTimeout(() => {
          console.log('加载-----')
        }, 1000)
      })
    }, 0)
  })
}

/**
 * 订单操作
 */
//接单2->3
let flag = ref<number>(20)
const onConfirm = async () => {
  if (orderData.orderStatus !== 2) {
    showToast('订单状态异常！', 'error')
    return
  }
  const res = await confirmTheOrder(orderData.orderID)
  if (res.code === 20001) {
    nextTick(() => {
      OrderStore.confirmed = res.data.CONFIRMED
      OrderStore.to_be_confirmed = res.data.TO_BE_CONFIRMED
      let index = OrderStore.localOrderData.findIndex((item) => item.orderID === orderData.orderID)
      OrderStore.localOrderData.splice(index, 1)
    })
    if (MerchantPages.RWInfo.deviceId) {
      await BLEPrint() //打印
      showToast('接单成功！', 'success')
    } else {
      uni.showToast({
        icon: 'none',
        title: '请连接蓝牙打印机!',
      })
    }
  } else {
    showToast('接单失败', 'error')
  }
}
const onConfirm_debounce = debounce(onConfirm, 1000, true)

//完成3->4//6
const onComplete = async () => {
  if (orderData.orderStatus !== 3) {
    showToast('订单状态异常', 'error')
    return
  }
  const res = await completeOrder(orderData.orderID)
  if (res.code === 20001) {
    nextTick(() => {
      OrderStore.confirmed = res.data.CONFIRMED
      OrderStore.to_be_confirmed = res.data.TO_BE_CONFIRMED
      let index = OrderStore.localOrderData.findIndex((item) => item.orderID === orderData.orderID)
      OrderStore.localOrderData.splice(index, 1)
      showToast('完成订单！', 'success')
    })
  } else {
    showToast('操作失败', 'error')
  }
}

const onComplete_debounce = debounce(onComplete, 1000, true)
//退款3->8
const onRefundsConfirmed = async () => {
  if (orderData.orderStatus !== 3) {
    showToast('订单状态异常', 'error')
    return
  }

  const res = await refundsConfirmedOrders(orderData.orderID)
  if (res.code === 20001) {
    let index = OrderStore.localOrderData.findIndex((item) => item.orderID === orderData.orderID)
    OrderStore.localOrderData.splice(index, 1)
    nextTick(() => {
      OrderStore.confirmed = res.data.CONFIRMED
      OrderStore.to_be_confirmed = res.data.TO_BE_CONFIRMED
    })
    showToast('退单成功！', 'success')
  } else {
    showToast('退款失败', 'error')
  }
}
const onRefundsConfirmed_debounce = debounce(onRefundsConfirmed, 1000, true)

const showToast = (message: string, type: string) => {
  uni.showToast({
    title: message,
    icon: 'none',
    position: 'top',
  })
}
</script>

<template>
  <view class="oder-item">
    <view class="line oder-header">
      <view class="x-wrapper">
        <view class="oder-number">#{{ orderData.orderNumber }}</view>
        <view class="oder-type">{{ orderData.orderType ? '堂食' : '外卖' }}</view>
      </view>
      <view class="x-wrapper">
        <view class="btn" v-if="orderData.orderStatus === 2" @click="onConfirm_debounce">接单</view>
        <view class="btn" v-if="orderData.orderStatus === 3" @click="onComplete_debounce"
          >完成</view
        >
        <view
          class="btn warning-btn"
          v-if="orderData.orderStatus === 3"
          @click="onRefundsConfirmed_debounce"
          >退单</view
        >
        <view
          v-if="
            orderData.orderStatus === 4 ||
            orderData.orderStatus === 5 ||
            orderData.orderStatus === 6
          "
          >已完成</view
        >
      </view>
    </view>
    <view class="line oder-customer">
      <view class="x-wrapper">
        <view class="customer">{{ orderData.customer }}</view>
        <template v-if="orderData.orderType === 0">
          <view class="address">{{ orderData.address }}</view>
          <view class="address-number">{{ orderData.addressNumber }}</view>
        </template>
      </view>
    </view>
    <view class="line order-notes">
      <view class="Notes" style="">备注：{{ orderData.orderNotes }}</view>
    </view>
    <view class="menu-box">
      <view class="menu-line" v-for="line in orderData.menu.slice(0, 3)" :key="line.dishId">
        <view class="y-wrapper">
          <view class="disha-name" style="align-self: start">{{ line.dishName }}</view>
          <view class="dishSpecList" style="align-self: start">
            <view class="dishSpecItem" v-for="item in line.dishSpecList" :key="item">{{
              item
            }}</view>
          </view>
        </view>
        <view class="x-wrapper">
          <view class="dish-number">x{{ line.dishNumber }}</view>
          <view class="dish-price">{{ line.dishPrice }}元</view>
        </view>
      </view>
    </view>
    <view class="HIDDEN-box" :class="{ 'content-show': show }">
      <view class="inner">
        <view class="remaining menu-box" v-if="!!orderData.menu.slice(3)">
          <view class="menu-line" v-for="line in orderData.menu.slice(3)" :key="line.dishId">
            <view class="y-wrapper">
              <view class="disha-name" style="align-self: start">{{ line.dishName }}</view>
              <view class="dishSpecList" style="align-self: start">
                <view class="dishSpecItem" v-for="item in line.dishSpecList" :key="item">{{
                  item
                }}</view>
              </view>
            </view>
            <view class="x-wrapper">
              <view class="dish-number">x{{ line.dishNumber }}</view>
              <view class="dish-price">{{ line.dishPrice }}元</view>
            </view>
          </view>
        </view>
        <view class="oder-info-box">
          <view class="dish-info">
            <view class="totalPrice">菜品总价：{{ orderData.totalPrice }}元</view>
            <view class="coupon">-优惠券：{{ orderData.coupon }}元</view>
            <view class="actualPrice"
              >共计支付：
              <text style="font-weight: 550; font-size: 40rpx"> {{ orderData.actualPrice }}</text
              >元</view
            >
            <view class="actualPrice"
              >可提现金额：
              <text style="font-weight: 550; font-size: 40rpx">
                {{ orderData.withDrawableAmount }}</text
              >元</view
            >
          </view>
          <view class="remaining-info">
            <view class="phoneNumber">顾客电话：{{ orderData.phoneNumber }}</view>
            <view class="orderTime">下单时间：{{ orderData.orderTime }}</view>
            <view class="payMethod"
              >支付方式：{{ orderData.payMethod ? '支付宝支付' : '微信支付' }}</view
            >
            <view class="orderCode">订单编号：{{ orderData.orderCode }}</view>
          </view>
        </view>
      </view>
    </view>
    <view @click="onDescShow()" class="icon" :class="{ 'icon-show': show }">
      <i class="iconfont icon-jiantou_xia"></i>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.oder-item {
  background: $bg-color-light;
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
    white-space: nowrap;
    text-align: center;
    transition: 0.2s ease;
    font-size: 30rpx;
    background: $bg-color-green;
    padding: 10rpx;
    border-radius: 30rpx;
    min-width: 115rpx;
    &:active {
      scale: 0.95;
    }
    &.warning-btn {
      background: #fff;
      border: 1px solid $text-color-green;
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
      justify-content: space-between;
      gap: 20rpx;
      white-space: nowrap;
      border: 1px solid $text-color-green;
      border-radius: 10rpx;
      padding: 15rpx;
    }
    .dishSpecList {
      display: flex;
      align-items: center;
      gap: 10rpx;
      flex-wrap: wrap;
      .dishSpecItem {
        border-radius: 16rpx;
        padding: 5rpx;
        white-space: nowrap;
        background-color: $bg-color-green;
      }
    }
  }

  .icon {
    width: 100%;
    text-align: center;
    transition: 0.3s ease-out;
    .iconfont {
      font-size: 24rpx;
      color: $text-color-green;
    }
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
      .orderCode,
      .phoneNumber {
        user-select: text;
      }
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
