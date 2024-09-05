<script></script>
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
      <view class="hostname">
        <text>所有人姓名</text>
        <input type="text" />
      </view>
      <view class="shopname">
        <text>店铺名称</text>
        <input type="text" />
      </view>
      <view class="shopplace">
        <text>店铺地址</text>
        <input type="text" />
      </view>
      <label> <checkbox /><text>我已阅读并同意xxxxxxx</text> </label>
      <button class="next">下一步</button>
    </view>
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
  font-size: 14px;
  display: flex;
  flex-direction: column;
  margin-top: 30rpx;
  margin-left: 0;
  width: calc(100% - 130rpx);
  margin-right: 130rpx;
  align-items: flex-end;
  .hostname,
  .shopname,
  .shopplace {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    margin-left: 90rpx;

    text {
      white-space: nowrap;
    }
    input {
      margin-left: 20px;
      padding: 4px 0 3px 8px;
      border: 1px solid #000;
      background-color: #ccc;
      .uni-input-placeholder {
        font-size: 12px;
      }
    }
  }
  .next {
    width: 350rpx;
    margin: 30rpx auto;
    margin-left: 220rpx;
  }
}
</style>
