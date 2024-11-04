<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { AsideItem } from '@/types/aside'
import { onLoad } from '@dcloudio/uni-app'
import Header from './components/Header.vue'
import OderItemComponent from './components/OderItemComponent.vue'
/**
 * @description 订单管理主页面
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-31
 */

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '待处理', active: true, addNumber: 10 },
  { itemId: 1, itemName: '已确认', active: false, addNumber: 2 },
  { itemId: 2, itemName: '已完成', active: false },
  { itemId: 3, itemName: '已取消', active: false },
  { itemId: 4, itemName: '已退款', active: false },
])

const onSwitch = (e: number) => {}

const scrollTop = ref<number>(0)

const goTop = (e: any) => {
  scrollTop.value = 1
  // 解决view层不同步的问题
  nextTick(function () {
    scrollTop.value = 0
    uni.showToast({
      icon: 'none',
      title: '已返回顶部',
    })
  })
}

const res: OrderItem = {
  orderID: 0,
  orderCode: 'ABABAB',
  orderNumber: 1,
  customer: '应先生',
  orderNotes: '加麻加辣',
  orderTime: '09-30 13:25',
  phoneNumber: '16623819144',
  payMethod: 0,
  menu: [
    {
      dishId: 25,
      dishName: '辣椒炒大料',
      dishNumber: 12,
      dishSpecList: ['大份', '麻辣', '麻辣', '麻辣', '麻辣', '麻辣', '麻辣'],
      dishPrice: 56.32,
    },
    {
      dishId: 25,
      dishName: '辣椒炒大料',
      dishNumber: 12,
      dishSpecList: ['大份'],
      dishPrice: 56.32,
    },
    {
      dishId: 25,
      dishName: '辣椒炒大料',
      dishNumber: 12,
      dishSpecList: ['大份', '麻辣'],
      dishPrice: 56.32,
    },
    {
      dishId: 25,
      dishName: '辣椒炒大料',
      dishNumber: 12,
      dishSpecList: ['大份', '麻辣'],
      dishPrice: 56.32,
    },
  ],
  totalPrice: 112.64,
  coupon: 6,
  actualPrice: 106.64,
  orderType: 0,
  orderStatus: 2,
  addressID: 0,
  address: '11公寓',
  addressNumber: 'A4',
}

const resOrder = ref<OrderItem[]>([res, res, res, res, res, res, res, res, res])
</script>

<template>
  <view class="oder">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <view class="main">
      <Header />
      <view class="content">
        <view class="fn-wrapper">
          <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
            <OderItemComponent :orderItem="item" v-for="item in resOrder" :key="item.orderID" />
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.oder {
  border-radius: 28rpx 28rpx 0 0;
  box-shadow: 0 -6rpx 10rpx rgba(0, 0, 0, 0.15);
  padding: 25rpx 0 0 20rpx;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.main {
  width: 590rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 26rpx;
  padding: 20rpx 16rpx;
  font-size: 30rpx;
  .content {
    margin-top: 36rpx;
    width: 100%;
    height: 100%;
    .fn-wrapper {
      height: 1100rpx;
      .scroll-Y {
        height: 100%;
      }
    }
  }
}
</style>
