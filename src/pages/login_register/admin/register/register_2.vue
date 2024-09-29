<script lang="ts" setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/modules/admin_information'
import { admin_register } from '@/services/admin/admin_api'
import { gotoLogin } from '@/composables/navigation/navigation'
const adminStore = useAdminStore()
const handleRegister = async () => {
  admin_register(
    adminStore.phoneNumber,
    adminStore.password,
    adminStore.inviteCode,
    adminStore.realName,
    adminStore.college,
    adminStore.validationCode,
  ).then((response) => {
    console.log(response.data)
    gotoLogin()
  })
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
    <view class="invitation">
      <text>管理邀请码</text>
      <input type="text" v-model="adminStore.inviteCode" />
    </view>
    <button @click="handleRegister">确认</button>
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
    margin-left: 80rpx;
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
.invitation {
  display: flex;
  margin-top: 30rpx;
  margin-bottom: 40rpx;
  text {
    width: 24%;
    display: block;
    margin-left: 60rpx;
  }
  input {
    font-size: 16px;
    padding-left: 3rpx;
    background-color: #ccc;
    border: #000 solid 1rpx;
    width: 60%;
  }
}
button {
  width: 60%;
}
</style>
