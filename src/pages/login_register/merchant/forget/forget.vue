<script lang="ts" setup>
import { ref } from 'vue'
import { useMerchantStore } from '@/stores/modules/merchant_information'
import { merchant_getvalidationCode, merchant_checkCode } from '@/services/merchant/merchant_api'
import ValidationCodeButton from '@/components/ValidationCodeButton/merchant_ValidationCodeButton'
/**
 * @description alert函数在移动端不可用！后面请统一使用uni.Toast
 * @author 钟礼豪
 * @date 2024-09-不知道什么时候
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-27
 */
const merchantStore = useMerchantStore()
const phoneNumber = ref<string>()
const validationCode = ref<string>()
const is_phone_repeat = ref<boolean>(false)
const getValidationCode = async () => {
  if (!is_phone_repeat.value) {
    uni.showToast({
      icon: 'none',
      title: '该手机号未注册账号',
    })
    return
  }
  if (!phoneNumber.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入手机号',
    })

    return
  }
  try {
    const response = await merchant_getvalidationCode(phoneNumber.value)
    console.log(response)
    // 这里可以添加更多的成功处理逻辑
  } catch (error) {
    uni.showToast({
      icon: 'none',
      title: '获取验证码失败，请重试',
    })
  }
}
const gotoNext = async () => {
  const res = await merchant_checkCode(phoneNumber.value, validationCode.value)
  if (+res.code === 1) {
    merchantStore.phoneNumber = phoneNumber.value
    merchantStore.validationCode = validationCode.value
    uni.navigateTo({
      url: '/pages/login_register/merchant/forget/forget_1',
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
        <ValidationCodeButton
          :phoneNumber="phoneNumber"
          @repeat="
            (e) => {
              is_phone_repeat = e
            }
          "
        ></ValidationCodeButton>
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
      height: 50rpx;
      margin-left: 20px;
      padding: 4px 0 3px 8px;
      border: 1px solid $text-color-green;
      background-color: $bg-color-light;
      border-radius: 8px;
      width: 370rpx;
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
      border: 1px solid $text-color-green;
      background-color: $bg-color-light;
      border-radius: 8px;
      height: 50rpx;
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
      border-radius: 8rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .next {
    margin: 50rpx 160rpx;
    width: 470rpx;
    height: 90rpx;
    border-radius: 8rpx;
    border: $text-color-green solid 1rpx;
    background-color: $bg-color-green;
  }
}
</style>
