<script setup lang="ts">
//
import { computed, ref } from 'vue'
const activeLink = ref<string>('商家登录')
const setActiveLink = (link: string) => {
  activeLink.value = link
}
const identity = computed(() => (activeLink.value === '商家登录' ? 'merchant' : 'admin'))
const gotoLogin = () => {
  uni.navigateTo({
    url: `/pages/login_register/${identity.value}/login_password`,
  })
}
const gotoRegister = () => {
  console.log(identity.value)
  uni.navigateTo({
    url: `/pages/login_register/${identity.value}/register/register_1`,
  })
}
</script>

<template>
  <view class="login">
    <view class="logo">
      <image src="@/static/images/kssdt.png"></image>
    </view>
    <view class="identity">
      <view
        class="navigator"
        :class="{ active: activeLink === '商家登录' }"
        @click.prevent="setActiveLink('商家登录')"
        >商家登录</view
      >
      <text>|</text>
      <view
        class="navigator"
        :class="{ active: activeLink === '管理端登录' }"
        @click.prevent="setActiveLink('管理端登录')"
        >管理员登录</view
      >
    </view>
    <button @click="gotoLogin" class="btn_login">登录</button>
    <button @click="gotoRegister" class="btn_register">注册</button>
  </view>
</template>

<style lang="scss" scoped>
//
.login {
  font-size: 14px;
  .logo {
    width: 184px;
    height: 184px;
    margin: 20px auto;
    background-color: aliceblue;
    image {
      object-fit: cover;
    }
  }
  .identity {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 180px;
    .navigator {
      margin-right: 10px;
      margin-left: 10px;
      color: #000;
      text-decoration: none;
      &.active {
        text-decoration: underline;
        text-underline-offset: 10px;
      }
    }
  }
  button {
    margin: 20px auto;
    width: 257px;
    height: 45px;
    border-radius: 5px;
  }
  .btn_login {
    background-color: $bg-color-green;
  }
  .btn_register {
    background-color: $bg-color-gray-light;
    border: 1px solid #07bb00;
  }
}
</style>
