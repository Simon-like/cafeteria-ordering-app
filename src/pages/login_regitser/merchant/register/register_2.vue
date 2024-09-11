<script script lang="ts" setup>
const gotoNext = () => {
  uni.navigateTo({
    url: '/pages/login_regitser/merchant/register/register_3',
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
        <text>所有人姓名</text>
        <text>店铺名称</text>
        <text>店铺地址</text>
      </view>
      <view class="input_content">
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </view>
    </view>
    <text class="tips">--店铺详细信息注册完成后可在门店管理页面中更改--</text>
    <view class="checkbox__container">
      <label> <checkbox /><text>我已阅读并同意xxxxxx</text> </label>
    </view>
    <button @click="gotoNext()">下一步</button>
  </view>
</template>

<style lang="scss">
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
    right: -70px;
    top: 50%;
    width: 140rpx;
    height: 10rpx;
    background-color: #ccc;
    transform: translateY(-50%);
  }
}
.input {
  display: flex;
  margin-top: 20rpx;
  .text {
    width: 40%;
    text-align: end;
    text {
      display: block;
      margin: 20rpx 0;
      margin-right: 10rpx;
    }
  }
  .input_content {
    width: 60%;
    input {
      background-color: #ccc;
      border: #000 solid 1rpx;
      width: 60%;
      margin: 20rpx 0;
    }
  }
}
.tips {
  display: flex;
  justify-content: center;
  font-size: xx-small;
  color: #ccc;
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
