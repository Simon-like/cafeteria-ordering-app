<script setup lang="ts">
import { ref } from 'vue'
import type { AsideItem } from '../../../types/aside'
import { componentList } from '@/pages/merchant_end/my/content_view/index'
import { useMerchantStore } from '@/stores/modules/merchant_information'
import { GetMerchantInfo } from '@/services/merchant/merchant_api'
import { onLoad } from '@dcloudio/uni-app'
/**
 * @description 个人中心主页面
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */
const Merchant = useMerchantStore()
const HandleGetInfo = async () => {
  const res = await GetMerchantInfo()
  console.log('res_my:', res.data)
  Object.assign(Merchant, res.data)
}

onLoad(HandleGetInfo)

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '店铺信息', active: true },
  { itemId: 1, itemName: '联系客服', active: false },
  { itemId: 2, itemName: '账号管理', active: false },
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
