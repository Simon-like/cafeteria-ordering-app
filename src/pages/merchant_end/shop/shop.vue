<script setup lang="ts">
import { ref } from 'vue'
import type { AsideItem } from '../../../types/aside'
import { componentList } from '@/pages/merchant_end/shop/content_view/index'

/**
 * @description 店铺管理主界面
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '菜品信息', active: true },
  { itemId: 1, itemName: '财务帐单', active: false },
  { itemId: 2, itemName: '评价与活动', active: false },
])
const channelId = ref<number>(0)

const onSwitch = (e: number) => {
  channelId.value = e
}
</script>

<template>
  <view class="my">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <component :is="componentList[channelId]"></component>
  </view>
</template>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
