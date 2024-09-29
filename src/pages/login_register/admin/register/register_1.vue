<script lang="ts" setup>
import { ref } from 'vue'
import { admin_checkCode } from '@/services/admin/admin_api'
import { useAdminStore } from '@/stores/modules/admin_information'
import ValidationCodeButton from '@/components/ValidationCodeButton/admin_ValidationCodeButton'
/**
 * @description 增加了管理端仓库和相关调用，完善了验证验证码功能
 * @author 钟礼豪
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-27
 */
const adminStore = useAdminStore()
const phoneNumber = ref<string>('')
const password_1 = ref<string>('')
const password_2 = ref<string>('')
const validationCode = ref<string>('')
const realName = ref<string>('')
const is_phone_repeat = ref<boolean>(false)
const gotoNext = async () => {
  if (!adminStore.phoneNumber) {
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
  const res = await admin_checkCode(adminStore.phoneNumber, adminStore.validationCode)
  if (+res.code === 1) {
    if (password_1.value === password_2.value) {
      adminStore.password = password_1.value
      adminStore.phoneNumber = phoneNumber.value
      adminStore.validationCode = validationCode.value
      adminStore.realName = realName.value
      uni.navigateTo({
        url: '/pages/login_register/admin/register/register_2',
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '验证码错误',
      })
      return
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: '两次输入密码不同',
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
        <view class="circle" id="line"> 1 </view>
        <text>注册账户</text>
      </view>
      <view class="nav-item">
        <view class="circle"> 2 </view>
        <text>填写邀请码</text>
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
        <ValidationCodeButton :phoneNumber="phoneNumber"></ValidationCodeButton>
      </view>
      <view class="input-items">
        <text>使用人姓名</text>
        <input placeholder="请输入使用人姓名" type="text" v-model="realName" />
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
      <label> <checkbox /><text>我已阅读并同意xxxxxxx</text> </label
      ><button class="next" @click="gotoNext()">下一步</button>
    </view>
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
    right: -160rpx;
    top: 50%;
    width: 170rpx;
    height: 10rpx;
    background-color: #ccc;
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
      font-size: 16px;
      padding-left: 3rpx;
      background-color: #ccc;
      border: #000 solid 1rpx;
      width: 420rpx;
      margin-left: 20rpx;
      text-align: left;
    }
    .code {
      width: 200rpx;
    }
  }
}
.checkbox__container {
  margin: 20rpx 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 200rpx;

  .next {
    font-size: 16px;
    margin-top: 50rpx;
    display: flex;
    width: 45%;
    height: 80rpx;
    border: #000 solid 1rpx;
  }
}
</style>
