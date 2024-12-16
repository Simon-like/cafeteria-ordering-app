<script lang="ts" setup>
import { ref } from 'vue'
import { gotoLoginAndRegister } from '@/composables/navigation/navigation'
import { useMerchantStore } from '@/stores'

const Merchant = useMerchantStore()
</script>

<template>
  <view class="account-mana">
    <view class="platform-logo"> <image src="@/static/images/kssdt.png"></image> </view>
    <view class="account-info"> 当前账号：{{ Merchant.name }} </view>
    <view class="outlogin" @click="gotoLoginAndRegister"><button>退出登录</button></view>
  </view>
</template>

<style lang="scss" scoped>
.account-mana {
  width: 590rpx;
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
    margin: 0 auto;
    button {
      font-size: 28rpx;
      background-color: $bg-color-green;
      color: #000;
      width: 200rpx;
      padding: 5rpx 20rpx;
      border-radius: 80rpx;
      text-align: center;
      &:active {
        opacity: 0.8;
        transform: scale(0.95);
      }
    }
  }
}
</style>
