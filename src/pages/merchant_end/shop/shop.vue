<script setup lang="ts">
import { ref } from 'vue'
import type { AsideItem } from '../../../types/aside'
import { componentList } from '@/pages/merchant_end/shop/content_view/index'
import { useMerchantPagesStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
/**
 * @description 店铺管理主界面
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

const MerchantPages = useMerchantPagesStore()

const onSwitch = (e: number) => {
  MerchantPages.shopIndex = e
}

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '菜品信息', active: true },
  { itemId: 1, itemName: '财务帐单', active: false },
  { itemId: 2, itemName: '评价与活动', active: false },
])

onLoad(() => {
  my_aside_list.value.forEach((value, index, arr) => {
    arr[index].active = false
    if (index === MerchantPages.shopIndex) {
      arr[index].active = true
    }
  })
})
</script>

<template>
  <view class="shop">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <component :is="componentList[MerchantPages.shopIndex]"></component>
  </view>
</template>

<style lang="scss" scoped>
.shop {
  border-radius: 28rpx 28rpx 0 0;
  box-shadow: 0 -6rpx 10rpx rgba(0, 0, 0, 0.15);
  padding: 25rpx 0 0 20rpx;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
