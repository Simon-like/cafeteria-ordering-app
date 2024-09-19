<script setup lang="ts">
import { ref } from 'vue'
import { admin_Login_pp } from '@/services/admin/admin_api'
import { useDoubleTokenStore } from '@/stores'
import { gotoHome } from '@/composables/navigation/navigation'

/**
 * @description 修改了标签属性使用问题，减少了click事件的使用
 * @author 钟礼豪
 * @date 2024-09-19
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-09-19
 */

const phoneNumber = ref('')
const password = ref('')
const tokenStore = useDoubleTokenStore()

const handleLogin_pp = async () => {
  const res = await admin_Login_pp(phoneNumber.value, password.value)
  const accessToken = res.data.accessToken
  const refreshToken = res.data.refreshToken
  tokenStore.addToken(accessToken, refreshToken)
  if (+res.code === 1) {
    gotoHome()
  }
}
</script>
<template>
  <view class="body">
    <view class="title">登录 </view>
    <view class="input">
      <view class="userid">
        <text>账号</text>
        <input v-model="phoneNumber" type="text" placeholder="请输入账号/手机号" />
      </view>
      <view class="password">
        <text>密码</text>
        <input v-model="password" type="safe-password" placeholder="请输入账号密码" />
      </view>
      <view class="forgetpassword">
        <navigator url="/pages/login_register/admin/forget/forget">忘记密码?</navigator>
      </view>
      <view class="phonelogin">
        <navigator url="/pages/login_register/admin/phonelogin">手机号一键登录</navigator>
      </view>
      <button @click="handleLogin_pp()">登录</button>
      <view class="nouserid">
        <navigator url="/pages/login_register/admin/register/register_1"
          >还没有账号？去注册</navigator
        >
      </view>
      <text>______________________________________</text>
      <view class="wxlogin">
        <text>第三方登录方式</text>
        <view class="img">
          <i class="circle_icon"></i>
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
  margin-bottom: 20rpx;
  margin-left: 150rpx;
  margin-right: 0;
  text {
    margin: 0 30rpx;
  }
  input {
    position: relative;
    padding: 4px 0 3px 8px;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 8px;
  }
}

.forgetpassword {
  position: relative;
  margin-left: 70%;
  navigator {
    font-size: 12px;
    color: #000;
    text-decoration: none;
  }
}

.phonelogin {
  margin: 50rpx auto;
  margin-bottom: 20rpx;
  font-size: 32rpx;
  navigator {
    color: #000;
    text-decoration: underline;
    text-underline-offset: 3rpx;
  }
}

.nouserid {
  position: relative;
  margin-left: 340rpx;
  navigator {
    color: #000;
    text-decoration: underline;
    text-underline-offset: 3rpx;
  }
}
text {
  margin: 10rpx auto;
}
.wxlogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 10rpx;
  .img {
    margin: 10rpx 0;
    .circle_icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background-color: #ccc;
      display: inline-block;
    }
  }

  text {
    font-size: 26rpx;
  }
}
button {
  margin: 20px auto;
  width: 257px;
  height: 45px;
  border-radius: 5px;
  border: #000 solid 1rpx;
}
</style>
