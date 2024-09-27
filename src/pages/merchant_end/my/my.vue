<script setup lang="ts">
import { ref } from 'vue'
import type { AsideItem } from '@/types/aside'
import { componentList } from '@/pages/merchant_end/my/content_view/index'
import { useMerchantStore } from '@/stores/modules/merchant_information'
import { GetMerchantInfo } from '@/services/merchant/merchant_api'
import { onLoad } from '@dcloudio/uni-app'
import { useMerchantPagesStore } from '@/stores'
/**
 * @description 个人中心主页面
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '店铺信息', active: true },
  { itemId: 1, itemName: '联系客服', active: false },
  { itemId: 2, itemName: '账号管理', active: false },
])
const Merchant = useMerchantStore()
const MerchantPages = useMerchantPagesStore()
const HandleGetInfo = async () => {
  const res = await GetMerchantInfo()
  Object.assign(Merchant, res.data)
}

onLoad(() => {
  my_aside_list.value.forEach((value, index, arr) => {
    arr[index].active = false
    if (index === MerchantPages.myIndex) {
      arr[index].active = true
    }
  })
})

const onSwitch = (e: number) => {
  MerchantPages.myIndex = e
}
</script>

<template>
  <view class="my">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <component :is="componentList[MerchantPages.myIndex]"></component>
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
