<script lang="ts" setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/modules/admin_information'
import { admin_checkCode, admin_getvalidationCode } from '@/services/admin/admin_api'
/**
 * @description alert函数在移动端不可用！后面请统一使用uni.Toast
 * @author 钟礼豪
 * @date 2024-09-不知道什么时候
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-27
 */

const adminStore = useAdminStore()
const phoneNumber = ref<string>()
const validationCode = ref<string>()

const getValidationCode = async () => {
  if (!phoneNumber.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入手机号',
    })
    return
  }
  admin_getvalidationCode(phoneNumber.value)
    .then((response) => {
      console.log(response)
      if (response) {
        console.log(response)
      } else {
        uni.showToast({
          icon: 'none',
          title: '获取验证码失败，请重试',
        })
      }
    })
    .catch((error) => {
      console.log(error)
      uni.showToast({
        icon: 'none',
        title: '获取验证码失败，请重试',
      })
    })
}
const gotoNext = async () => {
  if (!phoneNumber.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入手机号',
    })
    return
  }
  if (!validationCode.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入验证码',
    })
    return
  }
  const res = await admin_checkCode(phoneNumber.value, validationCode.value)
  if (+res.code === 1) {
    adminStore.phoneNumber = phoneNumber.value
    adminStore.validationCode = validationCode.value
    uni.navigateTo({
      url: '/pages/login_register/admin/forget/forget_1',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '验证码错误',
    })
  }
}
</script>

<template>
  <view class="body">
    <view class="title"> 找回密码 </view>
    <view class="input">
      <view class="phoneNumber">
        <text>手机号</text>
        <input type="text" v-model="phoneNumber" />
      </view>
      <view class="password">
        <text>验证码</text>
        <input type="text" class="input_password" v-model="validationCode" />
        <button @click="getValidationCode">获取验证码(60s)</button>
      </view>
      <button class="next" @click="gotoNext()">下一步</button>
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

  .phoneNumber {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    margin-left: 140rpx;
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
    margin-bottom: 30rpx;
    margin-left: 140rpx;
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
      margin-top: 0;
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
  .next {
    margin: 50rpx 160rpx;
    width: 470rpx;
    height: 90rpx;
    border-radius: 5px;
    border: #000 solid 1rpx;
    background-color: transparent;
  }
}
</style>
