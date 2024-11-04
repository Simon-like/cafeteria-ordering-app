<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useMerchantStore } from '@/stores'
const merchantStore = useMerchantStore()
const work_status = ref()
// 使用watchEffect来监听operationStatus的变化
watchEffect(() => {
  work_status.value = ref<string>(merchantStore.operationStatus === 0 ? '营业中' : '未营业')
})
</script>

<template>
  <view class="header-bar">
    <view class="title-box">
      <view class="title">{{ merchantStore.name }}</view>
      <view class="work-status"
        ><i class="iconfont icon-dian" :class="{ work: work_status.value === '营业中' }"></i
        >{{ work_status.value }}</view
      >
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

  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rpx;

    .title {
      font-size: 30rpx;
    }

    .work-status {
      font-size: 25rpx;
      .iconfont {
        color: rgba(255, 0, 0, 0.8);

        &.work {
          color: rgba(0, 245, 0, 0.8);
        }
      }
    }
  }
}
</style>
