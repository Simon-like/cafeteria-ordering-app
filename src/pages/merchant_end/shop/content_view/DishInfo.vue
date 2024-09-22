<script lang="ts" setup>
import type { AsideItem } from '../../../types/aside'
import { ref } from 'vue'
/**
 * @description 店铺管理菜单信息管理
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-22
 */

// 分组信息
const category_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '本店精品菜！！', active: true },
  { itemId: 1, itemName: '特色必点', active: false },
  { itemId: 2, itemName: '主食', active: false },
])
const channelId = ref<number>(0)
const onSwitch = (e: number) => {
  channelId.value = e
}

// 菜品类型信息
type statusItem = {
  index: number
  title: string
  number: number
  active: boolean
}
const status_list = ref<statusItem[]>([
  { index: 0, title: '全部', number: 0, active: true },
  { index: 1, title: '热销', number: 0, active: false },
  { index: 2, title: '已下架', number: 0, active: false },
  { index: 3, title: '已售罄', number: 0, active: false },
  { index: 4, title: '折扣', number: 0, active: false },
  { index: 5, title: '单点不送', number: 0, active: false },
])
const statusSwitch = (index: number) => {
  status_list.value.forEach((item) => {
    if (index !== item.index) item.active = false
    else item.active = true
  })
}
</script>

<template>
  <view class="dish-info">
    <view class="status-header">
      <view
        class="status-box"
        v-for="item in status_list"
        :key="item.index"
        @click="statusSwitch(item.index)"
        :class="{ active: item.active }"
      >
        <view class="title">{{ item.title }}</view>
        <view class="number">{{ item.number }}</view>
      </view>
    </view>

    <view class="dish-body">
      <AsideBar :itemList="category_list" @switch="onSwitch" />
      <view class="dish-content">
        <view class="addDish-box">+ 新增菜品</view>
        <scroll-view
          :scroll-top="scrollTop"
          scroll-y="true"
          class="scroll-Y"
          @scrolltoupper="upper"
          @scrolltolower="lower"
          @scroll="scroll"
        >
          <view class="dish-wrapper" v-for="item in 20">
            <view class="dish-img"></view>
            <view class="dish-info">
              <view class="dish-name">海参</view>
              <view class="dish-value-line">
                <view class="today-inventory">今日库存(/份) 24</view>
              </view>
              <view class="dish-price-line"></view>
              <view class="dish-status-line"></view>
              <view class="button-box"></view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scope>
.dish-info {
  width: 610rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30rpx;
  padding: 0;
  .status-header {
    width: 100%;
    height: 115rpx;
    border-bottom: 2px solid rgba(0, 0, 0, 0.8);
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    overflow-x: auto;

    .status-box {
      position: relative;
      display: flex;
      gap: 10rpx;
      padding: 8rpx;
      .title {
        white-space: nowrap;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -6rpx;
        width: 100%;
        height: 3rpx;
        background: #000;
        border-radius: 5rpx;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform 0.5s;
        font-size: 2em;
      }

      &.active::after {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
  .dish-body {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    .dish-content {
      width: 470rpx;
      height: 1200rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8rpx;
      overflow: hidden;
      gap: 10rpx;
      .addDish-box {
        width: 210rpx;
        height: 50rpx;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 16rpx;
        line-height: 50rpx;
        text-align: center;
        font-weight: 550;
        transition: 0.2s ease;
        &:active {
          scale: 0.95;
        }
      }
      .dish-wrapper {
        width: 100%;
        height: 200rpx;
        background-color: rgba(0, 0, 0, 0.1);
        margin-bottom: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18rpx 5rpx;
        gap: 20rpx;
        .dish-img {
          width: 150rpx;
          height: 150rpx;
          background-color: rgba(0, 0, 0, 0.2);
        }
        .dish-info {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10rpx;
          .dish-name {
            font-weight: 600;
          }
          .dish-value-line {
            font-size: 18rpx;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
