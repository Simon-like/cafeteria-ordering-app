<script setup lang="ts">
import { ref } from 'vue'
import { merchant_Login_pv, merchant_getvalidationCode } from '@/services/merchant/merchant_api'
import { gotoHome } from '@/composables/navigation/navigation.ts'
import { useDoubleTokenStore } from '@/stores'

const phoneNumber = ref<string>('')
const validationCode = ref<string>('')

const tokenStore = useDoubleTokenStore()
const handleLogin_pv = async () => {
  const res = await merchant_Login_pv(phoneNumber.value, validationCode.value)
  const accessToken = res.data.accessToken
  const refreshToken = res.data.refreshToken
  tokenStore.addToken(accessToken, refreshToken)
}
const getValidationCode = async () => {
  merchant_getvalidationCode(phoneNumber.value).then((response) => {
    console.log(response)
  })
  // 处理获取验证码的逻辑，例如计时器等
}
</script>
<template>
  <view class="body">
    <view class="title"> 登录 </view>
    <view class="input">
      <view class="phoneNumber">
        <text>手机号</text>
        <input v-model="phoneNumber" type="text" />
      </view>
      <view class="password">
        <text>验证码</text>
        <input v-model="validationCode" type="text" class="input_password" />
        <button @click="getValidationCode()">获取验证码(60s)</button>
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
  align-items: center;
  justify-content: center;

  .phoneNumber {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    margin-left: 0;

    input {
      margin-left: 20px;
      padding: 4px 0 3px 8px;
      border: 1px solid #ccc;
      background-color: #ccc;
      border-radius: 8px;
    }
  }

  .password {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    margin-left: 0;
    .input_password {
      margin-left: 20px;
      padding: 4px 0 3px 8px;
      border: 1px solid #ccc;
      background-color: #ccc;
      border-radius: 8px;
      width: 150rpx;
    }
    button {
      margin-left: 20rpx;
      margin-top: 2rpx;
      padding: 0;
      font-size: 12px;
      width: 200rpx;
      height: 50rpx;
      border: #000 solid 1rpx;
      background-color: transparent;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .login {
    margin: 50rpx 160rpx;
    width: 470rpx;
    height: 90rpx;
    border-radius: 5px;
    border: #000 solid 1rpx;
    background-color: transparent;
  }
}
</style>
