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
  AdminPages.myIndex = e
}
</script>

<template>
  <view class="contact_center">
    <AsideBar :itemList="my_aside_list" @switch="onSwitch" />
    <component :is="componentList[AdminPages.myIndex]"></component>
  </view>
</template>

<style lang="scss" scope>
.contact_center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
