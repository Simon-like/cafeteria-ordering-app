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
    <up-scroll-list :indicator="false" class="status-header">
      <view
        class="status-box"
        v-for="item in status_list"
        :key="item.index"
        @click="statusSwitch(item.index)"
      >
        <view class="wrapper" :class="{ active: item.active }">
          <view class="title">{{ item.title }}</view>
          <view class="number">{{ item.number }}</view>
        </view>
      </view>
    </up-scroll-list>

    <view class="content">
      <AsideBar :itemList="category_list" @switch="onSwitch" />
      <view class=""></view>
    </view>
  </view>
</template>

<style lang="scss" scope>
.dish-info {
  width: 600rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30rpx;
  padding: 0;
  .status-header {
    width: 100%;
    height: 120rpx;
    border-bottom: 2px solid rgba(0, 0, 0, 0.8);
    padding: 0 20rpx;
    line-height: 120rpx;

    .status-box {
      margin-right: 30rpx;
      .wrapper {
        display: flex;

        gap: 10rpx;
        .title {
          white-space: nowrap;
        }
      }
      .active {
      }
    }
  }
  .content {
    width: 100rpx;
    flex-grow: 1;
  }
}
</style>
