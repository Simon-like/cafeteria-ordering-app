<script setup lang="ts">
const gotoHome = () => {
  uni.switchTab({
    url: '/pages/merchant_end/index/index',
  })
}
</script>
<template>
  <view class="body">
    <view class="title">登录 </view>
    <view class="input">
      <view class="userid">
        <text>账号</text>
        <input type="text" placeholder="请输入账号/手机号" />
      </view>
      <view class="password">
        <text>密码</text>
        <input type="label" placeholder="请输入账号密码" />
      </view>
      <view class="forgetpassword">
        <a href="">忘记密码?</a>
      </view>
      <view class="phonelogin">
        <a href="">手机号一键登录</a>
      </view>
      <button @click="gotoHome">登录</button>
      <view class="nouserid">
        <a href="">还没有账号？去注册</a>
      </view>
      <view class="wxlogin">
        <text>第三方登录方式</text>
        <view class="img">
          <i class="image"></i>
        </view>
        <text>微信</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.title {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.userid,
.password {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 50px;
  input {
    margin-left: 20px;
    padding: 4px 0 3px 8px;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 8px;
  }
}

.forgetpassword {
}
button {
  margin: 20px auto;
  width: 257px;
  height: 45px;
  border-radius: 5px;
}
</style>
