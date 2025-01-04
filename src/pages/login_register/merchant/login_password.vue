<script setup lang="ts">
import { ref } from 'vue'
import { merchant_Login_pp } from '@/services/merchant/merchant_api'
import { useDoubleTokenStore } from '@/stores'
import { gotoMerchantHome } from '@/composables/navigation/navigation'

/**
 * @description 商家端账号密码登录，成功设置动态修改tabbar
 * @author 钟礼豪 应东林
 * @date 2024-09-20
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-20
 */

const phoneNumber = ref('')
const password = ref('')
const tokenStore = useDoubleTokenStore()

const handleLogin_pp = async () => {
  const res = await merchant_Login_pp(phoneNumber.value, password.value)
  if (+res.code === 1) {
    const accessToken = res.data.accessToken
    const refreshToken = res.data.refreshToken
    tokenStore.addToken(accessToken, refreshToken)
    gotoMerchantHome()
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg,
    })
  }
}
</script>
<template>
  <view class="body">
    <view class="title">登录 </view>
    <view class="input">
      <view class="userid">
        <text>账号</text>
        <input v-model="phoneNumber" type="text" placeholder="请输入账号/手机号" />
      </view>
      <view class="password">
        <text>密码</text>
        <input v-model="password" type="safe-password" placeholder="请输入账号密码" />
      </view>
      <view class="forgetpassword">
        <navigator url="/pages/login_register/merchant/forget/forget">忘记密码?</navigator>
      </view>
      <view class="phonelogin">
        <navigator url="/pages/login_register/merchant/phonelogin">手机号一键登录</navigator>
      </view>
      <button @click="handleLogin_pp()">登录</button>
      <view class="nouserid">
        <navigator url="/pages/login_register/merchant/register/register_1"
          >还没有账号？去注册</navigator
        >
      </view>
      <i class="line"></i>
      <!-- <view class="wxlogin">
        <text>第三方登录方式</text>
        <view class="img">
          <image src="@/static/images/wxlogin.png"></image>
        </view>
        <text>微信</text>
      </view> -->
    </view>
  </view>
</template>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  .title {
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .input {
    display: flex;
    flex-direction: column;
    width: 100%;

    .userid,
    .password {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      margin-left: 150rpx;
      margin-right: 0;
      text {
        margin: 0 30rpx;
      }
      input {
        height: 50rpx;
        position: relative;
        padding: 4rpx 0 3rpx 8rpx;
        border: 1px solid #b1caae;
        background-color: $bg-color-gray-light;
        border-radius: 8rpx;
      }
    }

    .forgetpassword {
      position: relative;
      margin-left: 70%;
      navigator {
        font-size: 12px;
        color: #949494;
        text-decoration: none;
      }
    }

    .phonelogin {
      margin: 50rpx auto;
      margin-bottom: 20rpx;
      font-size: 32rpx;
      navigator {
        color: #000;
        text-decoration: underline;
        text-underline-offset: 3rpx;
      }
    }
    .nouserid {
      position: relative;
      margin-left: 340rpx;
      navigator {
        color: #949494;
        text-decoration: underline;
        text-underline-offset: 3rpx;
      }
    }

    .line {
      background-color: #000;
      width: 90%;
      margin: 20rpx auto;
      height: 2rpx;
    }

    .wxlogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 10rpx;
      .img {
        margin: 10rpx 0;
        object-fit: cover;
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}

button {
  margin: 20px auto;
  width: 357rpx;
  height: 75rpx;
  border-radius: 5%;
  border: #000 solid 1rpx;
  background-color: $bg-color-green;
}
</style>
