<script setup lang="ts">
import { ref } from 'vue'
import type { AsideItem } from '../../../types/aside'
import { componentList } from '@/pages/merchant_end/my/content_view/index'
import { onLoad } from '@dcloudio/uni-app'

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '店铺信息', active: true, hrefUrl: '' },
  { itemId: 1, itemName: '联系客服', active: false, hrefUrl: '' },
  { itemId: 2, itemName: '账号管理', active: false, hrefUrl: '' },
])
const channelId = ref<number>(0)

const onSwitch = (e: number) => {
  channelId.value = e
}
</script>

<template>
  <view class="my">
    <custom-nav-bar></custom-nav-bar>
    <HeaderBar />
    <view class="content">
      <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
      <component :is="componentList[channelId]"></component>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.my {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
