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
      <text>logo</text>
    </view>

    <view class="identity">
      <navigator
        class="navigator"
        url=""
        :class="{ active: activeLink === '商家登录' }"
        @click.prevent="setActiveLink('商家登录')"
        >商家登录</navigator
      >
      <text>|</text>
      <navigator
        class="navigator"
        url=""
        :class="{ active: activeLink === '管理端登录' }"
        @click.prevent="setActiveLink('管理端登录')"
        >管理员登录</navigator
      >
    </view>
    <button @click="gotoLogin">登录</button>
    <button @click="gotoRegister">注册</button>
  </view>
</template>

<style lang="scss" scoped>
//
.login {
  font-size: 14px;
}
.logo {
  width: 184px;
  height: 184px;
  margin: 20px auto;
  background-color: aliceblue;
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
</style>
