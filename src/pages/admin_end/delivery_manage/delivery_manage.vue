<script lang="ts" setup>
import { ref } from 'vue'
import type { AsideItem } from '@/types/aside'
import { componentList } from '@/pages/admin_end/delivery_manage/content_view/index'
import { useAdminPagesStore } from '@/stores'

/**
 * @description 管理端个人中心页面
 * @author 钟礼豪
 * @date 2024-10-26
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-26
 */

const AdminPages = useAdminPagesStore()

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '外卖员信息反馈', active: true },
  { itemId: 1, itemName: '外卖员资质审核', active: false },
  { itemId: 2, itemName: '外卖员管理', active: false },
])

const onSwitch = (e: number) => {
  AdminPages.deliveryIndex = e
}

onLoad(() => {
  my_aside_list.value.forEach((value, index, arr) => {
    arr[index].active = false
    if (index === AdminPages.deliveryIndex) {
      arr[index].active = true
    }
  })
})
</script>

<template>
  <view class="contact_center">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <component :is="componentList[AdminPages.deliveryIndex]"></component>
  </view>
</template>

<style lang="scss" scoped>
.contact_center {
  width: 100%;
  padding: 25rpx 0 0 20rpx;
  border-radius: 28rpx 28rpx 0 0;
  box-shadow: 0 -6rpx 10rpx rgba(0, 0, 0, 0.15);
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
