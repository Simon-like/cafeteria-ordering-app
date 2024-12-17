<script lang="ts" setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/modules/admin_information'
import { admin_register, verifyInviteCode } from '@/services/admin/admin_api'
import { gotoLogin } from '@/composables/navigation/navigation'
const adminStore = useAdminStore()
const handleRegister = async () => {
  const res = await verifyInviteCode(adminStore.inviteCode)
  if (res) {
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
}
</script>
<template>
  <view class="body">
    <view class="title"> 注册 </view>
    <view class="nav">
      <view class="nav-item">
        <view class="circle line"> 1 </view>
        <text>注册账户</text>
      </view>
      <view class="nav-item">
        <view class="circle" id="active"> 2 </view>
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
    height: 50rpx;
    font-size: 16px;
    padding-left: 3rpx;
    background-color: $bg-color-gray-light;
    border: $text-color-green solid 0.5px;
    width: 60%;
  }
}
button {
  width: 620rpx;
  height: 90rpx;
  border-radius: 5px;
  border: $text-color-green solid 1rpx;
  background-color: $bg-color-green;
}
</style>
