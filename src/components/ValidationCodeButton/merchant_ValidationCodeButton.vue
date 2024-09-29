<template>
  <button :disabled="isCounting" @click="getValidationCode">
    {{ isCounting ? `获取验证码(${countdown}s)` : '获取验证码' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { merchant_getvalidationCode } from '@/services/merchant/merchant_api'

const props = defineProps({
  phoneNumber: String,
})

const countdown = ref(60)
const isCounting = ref(false)

const getValidationCode = async () => {
  if (!props.phoneNumber) {
    uni.showToast({
      icon: 'none',
      title: '请输入手机号',
    })
    return
  }
  const response = await merchant_getvalidationCode(props.phoneNumber)
  console.log(response)
  if (response) {
    startCountdown()
  } else {
    uni.showToast({
      icon: 'none',
      title: '获取验证码失败，请重试',
    })
  }
}
const startCountdown = () => {
  isCounting.value = true
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    } else {
      clearInterval(interval)
      countdown.value = 60
      isCounting.value = false
    }
  }, 1000)
}
</script>

<style>
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
</style>
