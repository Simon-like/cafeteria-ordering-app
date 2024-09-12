<script lang="ts" setup>
import { ref } from 'vue'
import { merchant_getvalidationCode } from '@/services/merchant/merchant_api'
const phoneNumber = ref('')
const gotoNext = () => {
  uni.navigateTo({
    url: '/pages/login_register/merchant/register/register_2',
  })
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
    <view class="title"> 注册 </view>
    <view class="nav">
      <view class="nav-item">
        <view class="circle" id="line"> 1 </view>
        <text>注册账户</text>
      </view>
      <view class="nav-item">
        <view class="circle" id="line"> 2 </view>
        <text>门店信息</text>
      </view>
      <view class="nav-item">
        <view class="circle"> 3 </view>
        <text>资质审核</text>
      </view>
    </view>
    <view class="input">
      <view class="text">
        <text>手机号</text>
        <text>验证码</text>
        <text>设置登录密码</text>
        <text>确认登录密码</text>
      </view>
      <view class="input_content">
        <input placeholder="请输入使用人手机号" type="text" v-model="phoneNumber" />
        <button class="verification_btn" @click="getValidationCode()">获取验证码(60s)</button>
        <input class="verification" placeholder="请输入验证码" type="text" />
        <input placeholder="请输入密码" type="text" />
        <input placeholder="请输入密码" type="text" />
      </view>
    </view>
    <view class="checkbox__container">
      <label> <checkbox /><text>我已阅读并同意xxxxxxx</text> </label>
    </view>

    <button class="next" @click="handleRegister">下一步</button>
  </view>
</template>

<style lang="scss" scoped>
.title {
  font-size: 68rpx;
  margin: 20rpx auto;
  margin-left: 320rpx;
  margin-bottom: 40rpx;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-item {
    margin-left: 50rpx;
    position: relative;
    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      background-color: #ccc;
      margin-left: 42rpx;
      margin-bottom: 20rpx;
    }
  }
}
#line {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: -170rpx;
    top: 50%;
    width: 170rpx;
    height: 10rpx;
    background-color: #ccc;
    transform: translateY(-50%);
  }
}
.input {
  display: flex;
  .text {
    width: 30%;
    text-align: end;
    text {
      display: block;
      margin: 20rpx 0;
      margin-right: 10rpx;
    }
  }
  .input_content {
    width: 80%;
    input {
      background-color: #ccc;
      border: #000 solid 1rpx;
      width: 85%;
      margin: 20rpx 0;
      &::placeholder {
        color: #999;
        font-size: 28rpx;
        padding-left: 5rpx;
      }
    }
    .verification {
      width: 40%;
    }
    .verification_btn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      top: 24.5%;
      right: 80rpx;
      font-size: 11px;
    }
  }
}
.checkbox__container {
  margin: 20rpx 0;
  display: flex;
  justify-content: center;
}
button {
  width: 45%;
  border: #000 solid 1rpx;
}
</style>
