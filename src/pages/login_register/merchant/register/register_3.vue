<script lang="ts" setup>
import { merchant_register } from '@/services/merchant/merchant_api'
import { useMerchantStore } from '@/stores'
import { gotoLogin } from '@/composables/navigation/navigation'
const merchantStore = useMerchantStore()

const handleRegister = async () => {
  merchant_register(
    merchantStore.phoneNumber,
    merchantStore.realName,
    merchantStore.name,
    merchantStore.address,
    merchantStore.password,
    merchantStore.collegeId,
    merchantStore.detailedAddress,
  ).then((response) => {
    gotoLogin()
  })
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
        <view class="circle line"> 2 </view>
        <text>门店信息</text>
      </view>
      <view class="nav-item">
        <view class="circle" id="active"> 3 </view>
        <text>资质审核</text>
      </view>

      <view class="content">
        <text>手机号：{{ merchantStore.phoneNumber }}</text>
        <text>所有人姓名：{{ merchantStore.realName }}</text>
        <text>店铺名称：{{ merchantStore.name }}</text>
        <text>店铺地址：{{ merchantStore.address }}{{ merchantStore.detailedAddressa }}</text>
      </view>
    </view>
    <button @click="handleRegister">提交审核</button>
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

.content {
  position: absolute;
  top: 300rpx;
  text {
    display: block;
    margin-bottom: 15rpx;
  }
}
button {
  position: absolute;
  top: 600rpx;
  left: 70rpx;
  width: 620rpx;
  height: 90rpx;
  border-radius: 5px;
  border: $text-color-green solid 1rpx;
  background-color: $bg-color-green;
}
</style>
