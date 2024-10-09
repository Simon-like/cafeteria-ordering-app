<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useAdminStore } from '@/stores'
const AdminStore = useAdminStore()

//测试数据
AdminStore.college = 'v专'
</script>

<template>
  <view class="header-bar">
    <view class="title-box">
      <view class="title">{{ AdminStore.college }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.header-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 115rpx;
  border-bottom: 2px solid rgba(16, 16, 16, 0.5);
  box-shadow: 0 3px 3px rgba(16, 16, 16, 0.2);

  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rpx;

    .title {
      font-size: 30rpx;
    }
  }
}
</style>
