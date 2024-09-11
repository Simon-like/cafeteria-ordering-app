<script lang="ts" setup>
import { ref } from 'vue'
const title_name = ref<string>('Simon正宗火锅店')
const work_status = ref<string>('营业中')
</script>

<template>
  <view class="header-bar">
    <view class="title-box">
      <view class="title">{{ title_name }}</view>
      <view class="work-status"
        ><i class="iconfont icon-dian" :class="{ work: work_status === '营业中' }"></i
        >{{ work_status }}</view
      >
    </view>
  </view>
</template>

<style lang="scss">
.header-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;
  border-bottom: 2px solid rgba(16, 16, 16, 0.5);
  box-shadow: 0 3px 3px rgba(16, 16, 16, 0.2);

  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rpx;

    .title {
      font-size: 25rpx;
    }

    .work-status {
      font-size: 16rpx;
      .iconfont {
        color: rgba(139, 139, 208, 0.8);

        &.work {
          color: rgba(0, 245, 0, 0.8);
        }
      }
    }
  }
}
</style>
