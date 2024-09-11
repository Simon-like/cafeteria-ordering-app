<script setup lang="ts">
import { ref } from 'vue'
import type { AsideItem } from '../../../types/aside'
import StoreInfo from '@/pages/merchant_end/my/content_view/StoreInfo.vue'

const my_aside_list = ref<AsideItem[]>([
  { itemName: '店铺信息', active: true, hrefUrl: '' },
  { itemName: '联系客服', active: false, hrefUrl: '' },
  { itemName: '账号管理', active: false, hrefUrl: '' },
])
</script>

<template>
  <view class="my">
    <HeaderBar />
    <view class="content">
      <AsideBar :itemList="my_aside_list" />
      <component :is="StoreInfo"></component>
    </view>
  </view>
</template>

<style lang="scss">
.my {
  width: 750rpx;
  height: calc(100vh - 110rpx);
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
