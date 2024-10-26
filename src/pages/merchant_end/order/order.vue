<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { AsideItem } from '@/types/aside'
import { onLoad } from '@dcloudio/uni-app'
import Header from './components/Header.vue'
import OderItem from './components/OderItem.vue'
/**
 * @description 订单管理主页面
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-24
 */

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '待处理', active: true },
  { itemId: 1, itemName: '已确认', active: false },
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
</script>

<template>
  <view class="oder">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <view class="main">
      <Header />
      <view class="content">
        <view class="fn-wrapper">
          <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
            <OderItem v-for="item in 15" />
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.oder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.main {
  width: 610rpx;
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
      height: 1200rpx;
      .scroll-Y {
        height: 100%;
      }
    }
  }
}
</style>
