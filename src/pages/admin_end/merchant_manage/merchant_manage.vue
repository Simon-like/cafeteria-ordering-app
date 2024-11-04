<script setup lang="ts">
import { ref } from 'vue'
import type { AsideItem } from '../../../types/aside'
import { componentList } from '@/pages/admin_end/merchant_manage/content_view/index'
import { useAdminPagesStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
/**
 * @description 商户管理主界面
 * @author 钟礼豪
 * @date 2024-10-5
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-09-17
 */

const AdminPages = useAdminPagesStore()

const onSwitch = (e: number) => {
  AdminPages.shopIndex = e
}

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '区域商家详细信息', active: true },
  { itemId: 1, itemName: '商家菜单管理', active: false },
  { itemId: 2, itemName: '商家资质审核', active: false },
  { itemId: 3, itemName: '商家信息反馈', active: false },
])

onLoad(() => {
  my_aside_list.value.forEach((value, index, arr) => {
    arr[index].active = false
    if (index === AdminPages.shopIndex) {
      arr[index].active = true
    }
  })
})
</script>

<template>
  <view class="my">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <component :is="componentList[AdminPages.shopIndex]"></component>
  </view>
</template>

<style lang="scss" scoped>
.my {
  border-radius: 28rpx 28rpx 0 0;
  box-shadow: 0 -6rpx 10rpx rgba(0, 0, 0, 0.15);
  padding: 25rpx 0 0 20rpx;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
