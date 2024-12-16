<script lang="ts" setup>
import { ref } from 'vue'
import { merchant_checkCode } from '@/services/merchant/merchant_api'
import { useMerchantStore } from '@/stores'
import ValidationCodeButton from '@/components/ValidationCodeButton/merchant_ValidationCodeButton'
/**
 * @description 修复了password传参问题,alert函数在移动端不可用！后面请统一使用uni.Toast
 * @author 钟礼豪
 * @date 2024-09-14
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-27
 */

const phoneNumber = ref<string>('')
const validationCode = ref<string>('')
const password_1 = ref<string>('')
const password_2 = ref<string>('')
const merchantStore = useMerchantStore()
const is_phone_repeat = ref<boolean>(false)
const gotoNext = async () => {
  uni.navigateTo({
    url: '/pages/login_register/merchant/register/register_2',
  })
  if (!phoneNumber.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入手机号',
    })
    return
  }
  if (is_phone_repeat.value) {
    uni.showToast({
      icon: 'none',
      title: '该手机号已被注册！',
    })
    return
  }
  const res = await merchant_checkCode(phoneNumber.value, validationCode.value)
  if (+res.code === 1) {
    if (!password_1.value || !password_2.value) {
      uni.showToast({
        icon: 'none',
        title: '请输入密码',
      })
    } else if (password_1.value === password_2.value) {
      merchantStore.phoneNumber = phoneNumber.value
      merchantStore.password = password_1.value
      uni.navigateTo({
        url: '/pages/login_register/merchant/register/register_2',
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '两次输入密码不同',
      })
      return
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: '请填写正确验证码',
    })

    return
  }
}
</script>
<template>
  <view class="body">
    <view class="title"> 注册 </view>
    <view class="nav">
      <view class="nav-item">
        <view class="circle line" id="active"> 1 </view>
        <text>注册账户</text>
      </view>
      <view class="nav-item">
        <view class="circle line"> 2 </view>
        <text>门店信息</text>
      </view>
      <view class="nav-item">
        <view class="circle"> 3 </view>
        <text>资质审核</text>
      </view>
    </view>
    <view class="input">
      <view class="input-items">
        <text>手机号</text>
        <input placeholder="请输入使用人手机号" type="text" v-model="phoneNumber" />
      </view>
      <view class="input-items">
        <text>验证码</text>
        <input placeholder="请输入验证码" type="text" v-model="validationCode" class="code" />
        <ValidationCodeButton
          :phoneNumber="phoneNumber"
          class="btn"
          @repeat="
            (e) => {
              is_phone_repeat = e
            }
          "
        ></ValidationCodeButton>
      </view>
      <view class="input-items">
        <text>设置登录密码</text>
        <input placeholder="请输入密码" type="text" v-model="password_1" />
      </view>
      <view class="input-items">
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
      background-color: #ecf8ec;
      margin-left: 42rpx;
      margin-bottom: 20rpx;
    }
    #active {
      background-image: linear-gradient(180deg, #6ce867 -14.29%, #c1fec1 105.36%);
    }
  }
}
.circle.line {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: -170rpx;
    top: 50%;
    width: 170rpx;
    height: 2rpx;
    background-color: $text-color-green;
    transform: translateY(-50%);
  }
}
.input {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: right;
  margin-top: 30rpx;
  .input-items {
    display: flex;
    margin-bottom: 40rpx;
    margin-right: 20rpx;
    align-items: center;
    text {
      width: 180rpx;
      margin-left: 60rpx;
      white-space: nowrap;
    }
    input {
      height: 50rpx;
      padding-left: 3rpx;
      background-color: $bg-color-gray-light;
      border: $text-color-green solid 0.5px;
      width: 420rpx;
      margin-left: 20rpx;
      text-align: left;
    }
    .code,
    .btn {
      width: 200rpx;
    }
  }
}
.checkbox__container {
  margin: 20rpx 0;
  display: flex;
  justify-content: center;
}
.next {
  width: 620rpx;
  height: 90rpx;
  border-radius: 5px;
  border: $text-color-green solid 1rpx;
  background-color: $bg-color-green;
}
</style>
