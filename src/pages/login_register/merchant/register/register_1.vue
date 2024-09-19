<script lang="ts" setup>
import { ref } from 'vue'
import { merchant_getvalidationCode } from '@/services/merchant/merchant_api'
import { useMerchantStore } from '@/stores'

/**
 * @description 修复了password传参问题
 * @author 钟礼豪
 * @date 2024-09-14
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-09-19
 */

const phoneNumber = ref<string>('')
const validationCode = ref<string>('')
const password_1 = ref<string>('')
const password_2 = ref<string>('')
const merchantStore = useMerchantStore()
const gotoNext = () => {
  //后续添加验证码验证
  if (password_1.value === password_2.value) {
    merchantStore.phoneNumber = phoneNumber.value
    merchantStore.password = password_1.value
    uni.navigateTo({
      url: '/pages/login_register/merchant/register/register_2',
    })
  }
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
      <view class="input-item">
        <text>手机号</text>
        <input placeholder="请输入使用人手机号" type="text" v-model="phoneNumber" />
      </view>
      <view class="input-item">
        <text>验证码</text>
        <input
          class="verification"
          placeholder="请输入验证码"
          type="text"
          v-model="validationCode"
        />
        <button class="verification_btn" @click="getValidationCode()">获取验证码(60s)</button>
      </view>
      <view class="input-item">
        <text>设置登录密码</text>
        <input placeholder="请输入密码" type="text" v-model="password_1" />
      </view>
      <view class="input-item">
        <text>确认登录密码</text>
        <input placeholder="请输入密码" type="text" v-model="password_2" />
      </view>
    </view>
    <view class="checkbox__container">
      <label> <checkbox /><text>我已阅读并同意xxxxxxx</text> </label>
    </view>

    <button class="next" @click="gotoNext">下一步</button>
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
  flex-direction: column; // 使每个 input-item 垂直排列
  margin-top: 30rpx;
  .input-item {
    display: flex;
    align-items: center; // 垂直居中对齐
    margin-bottom: 20rpx; // 每个 input 项的间距

    text {
      width: 230rpx; // 文本宽度
      margin-right: 10rpx; // 文本和 input 之间的间距
      text-align: right; // 右对齐文本
    }

    input {
      padding-left: 10rpx;
      background-color: #ccc;
      border: #000 solid 1rpx;
      width: 400rpx; // 输入框宽度，减去文本宽度和间距
    }
    .verification {
      width: 220rpx;
      margin-right: 0;
    }
    .verification_btn {
      font-size: xx-small;
      width: 170rpx;
      display: flex;
      justify-content: center;
      padding-left: 2rpx;
      padding-right: 2rpx;
      margin-right: 80rpx;
      margin-left: 10rpx;
      white-space: nowrap;
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
