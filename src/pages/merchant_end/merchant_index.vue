<script setup lang="ts">
import { componentList } from './index'
import { ref } from 'vue'

/**
 * @description 商户端入口页面
 * @author 应东林
 * @date 2024-09-21
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-21
 */

const channelId = ref<number>(0)

const onSwitch = (e: number) => {
  channelId.value = e
}
</script>

<template>
  <view class="index">
    <custom-nav-bar></custom-nav-bar>
    <HeaderBar></HeaderBar>
    <component :is="componentList[channelId]"></component>
    <MerchantTabbar @switch="onSwitch"></MerchantTabbar>
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
