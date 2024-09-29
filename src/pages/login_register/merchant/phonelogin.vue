<script setup lang="ts">
import { ref } from 'vue'
import {
  merchant_Login_pv,
  merchant_getvalidationCode,
  merchant_checkCode,
} from '@/services/merchant/merchant_api'
import { gotoMerchantHome } from '@/composables/navigation/navigation'
import { useDoubleTokenStore } from '@/stores'
import ValidationCodeButton from '@/components/ValidationCodeButton/merchant_ValidationCodeButton'
const phoneNumber = ref<string>('')
const validationCode = ref<string>('')
const tokenStore = useDoubleTokenStore()
const handleLogin_pv = async () => {
  const res = await merchant_Login_pv(phoneNumber.value, validationCode.value)
  if (+res.code === 1) {
    const accessToken = res.data.accessToken
    const refreshToken = res.data.refreshToken
    tokenStore.addToken(accessToken, refreshToken)
    gotoMerchantHome()
  }
}
</script>
<template>
  <view class="body">
    <view class="title"> 登录 </view>
    <view class="input">
      <view class="input-items">
        <text>手机号</text>
        <input v-model="phoneNumber" type="text" class="input_phoneNumber" />
      </view>
      <view class="input-items">
        <text>验证码</text>
        <input v-model="validationCode" type="text" />
        <ValidationCodeButton :phoneNumber="phoneNumber"></ValidationCodeButton>
      </view>
      <button class="login" @click="handleLogin_pv">登录</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100vw;
}
.title {
  font-size: 40rpx;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
}
.input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 200rpx;
  justify-content: center;
  .input-items {
    display: flex;
    margin-bottom: 40rpx;
    margin-right: 80rpx;
    .input_phoneNumber {
      width: 400rpx;
    }
    input {
      margin-left: 20px;
      padding: 4px 0 3px 8px;
      border: 1px solid #ccc;
      background-color: #ccc;
      border-radius: 8px;
      width: 170rpx;
    }
  }

  .login {
    margin: 40rpx 50rpx;
    width: 470rpx;
    height: 90rpx;
    border-radius: 5px;
    border: #000 solid 1rpx;
    background-color: transparent;
  }
}
</style>
