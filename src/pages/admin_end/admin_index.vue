<script setup lang="ts">
import { componentList } from './index'
import { ref } from 'vue'
import { useAdminPagesStore, useAdminStore } from '@/stores'
import { getInviteCode, ChangeAdminInfo, getAdminInfo } from '@/services/admin/admin_api'
import adminHeaderBar from '@/components/HeaderBar/adminHeaderBar.vue'
/**
 * @description 管理端入口页面
 * @author 应东林
 * @date 2024-09-21
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-21
 */
const adminStore = useAdminStore()
const AdminPages = useAdminPagesStore()

const handlegetInfo = async () => {
  const res = await getAdminInfo()
  adminStore.realName = res.data.realName
  adminStore.logo = res.data.avater
  adminStore.college = res.data.college
  adminStore.phoneNumber = res.data.phoneNumber
  console.log(res.data)
}

onLoad(handlegetInfo)
</script>

<template>
  <view class="index">
    <custom-nav-bar></custom-nav-bar>
    <adminHeaderBar></adminHeaderBar>
    <component :is="componentList[AdminPages.tabbarIndex]"></component>
    <AdminTabbar></AdminTabbar>
  </view>
</template>

<style lang="scss" scoped>
.index {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
