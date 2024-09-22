<script lang="ts" setup>
import { ref } from 'vue'
import { gotoLoginAndRegister } from '@/composables/navigation/navigation'
const account_info = ref('simon火锅店')
</script>

<template>
  <view class="account-mana">
    <view class="platform-logo"> 平台logo </view>
    <view class="account-info"> 当前账号：{{ account_info }} </view>
    <view class="outlogin" @click="gotoLoginAndRegister">退出登录</view>
  </view>
</template>

<style lang="scss" scoped>
.account-mana {
  width: 600rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 26rpx;
  gap: 44rpx;

  .platform-logo {
    width: 196rpx;
    height: 196rpx;
    background-color: rgba(126, 126, 94, 0.7);
    text-align: center;
    line-height: 196rpx;
    margin-top: 80rpx;
  }

  .account-info {
  }

  .outlogin {
    width: 270rpx;
    height: 44rpx;
    background-color: rgba(126, 126, 94, 0.7);
    line-height: 44rpx;
    text-align: center;
    transition: all 0.2s ease;

    &:active {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }
}
</style>
