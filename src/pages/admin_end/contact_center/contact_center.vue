<script lang="ts" setup>
import { ref } from 'vue'
import type { AsideItem } from '@/types/aside'
import { componentList } from '@/pages/admin_end/contact_center/content_view/index'
import { onLoad } from '@dcloudio/uni-app'
import { useAdminPagesStore } from '@/stores'

/**
 * @description 管理端个人中心页面
 * @author 应东林
 * @date 2024-10-11
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-11
 */

const AdminPages = useAdminPagesStore()

const my_aside_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '系统公告发布', active: true },
  { itemId: 1, itemName: '信息反馈', active: false },
  { itemId: 2, itemName: '管理员同事', active: false },
  { itemId: 3, itemName: '账号设置', active: false },
  { itemId: 4, itemName: '系统设置', active: false },
])

const onSwitch = (e: number) => {
  AdminPages.centerIndex = e
}
onLoad(() => {
  my_aside_list.value.forEach((value, index, arr) => {
    arr[index].active = false
    if (index === AdminPages.centerIndex) {
      arr[index].active = true
    }
  })
})
</script>

<template>
  <view class="contact_center">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <component :is="componentList[AdminPages.centerIndex]"></component>
  </view>
</template>

<style lang="scss" scope>
.contact_center {
  border-radius: 28rpx 28rpx 0 0;
  box-shadow: 0 -6rpx 10rpx rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
  padding: 25rpx 0 0 20rpx;
  display: flex;
  justify-content: space-between;
}
</style>
