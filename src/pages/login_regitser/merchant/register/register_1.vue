<script>
const gotoNext = () => {
  uni.navigateTo({
    url: '/src/pages/login_regitser/merchant/register/register_2',
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
      <view class="phoneNumber">
        <text>手机号</text>
        <input type="text" placeholder="请输入使用人手机号" />
      </view>
      <view class="verification">
        <text>验证码</text>
        <input type="text" placeholder="请输入验证码" />
        <button>获取验证码</button>
      </view>
      <view class="setLoginpassword">
        <text>设置登录密码</text>
        <input type="text" placeholder="请输入密码" />
      </view>
      <view class="confirmLoginpassword">
        <text>确认登录密码</text>
        <input type="text" placeholder="请输入密码" />
      </view>
      <label> <checkbox /><text>我已阅读并同意xxxxxxx</text> </label>
      <button class="next" @click="gotoNext()">下一步</button>
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
  width: calc(100% - 100rpx);
  margin-right: 100rpx;
  margin-left: 0;
  align-items: flex-end;
  .phoneNumber,
  .setLoginpassword,
  .confirmLoginpassword {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    margin-left: 90rpx;
    text {
      white-space: nowrap;
      width: 30%;
      margin: 0;
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

  .verification {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    margin-left: 140rpx;
    input {
      margin-left: 20px;
      padding: 4px 0 3px 8px;
      border: 1px solid #000;
      background-color: #ccc;
      width: 200rpx;
      .uni-input-placeholder {
        font-size: 12px;
      }
    }
    button {
      margin-left: 20rpx;
      margin-top: 0;
      padding: 0;
      font-size: 12px;
      width: 140rpx;
      height: 50rpx;
      border: #000 solid 1rpx;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .next {
    width: 350rpx;
    margin: 30rpx auto;
    margin-left: 220rpx;
  }
}
</style>
