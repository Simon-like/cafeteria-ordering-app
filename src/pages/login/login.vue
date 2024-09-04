<script setup lang="ts">
//
import { ref } from 'vue'
const activeLink = ref('商家登录')

function setActiveLink(link: string) {
  activeLink.value = link
}
</script>

<template>
  <view class="login">
    <view class="logo">
      <text>logo</text>
    </view>

    <view class="identity">
      <a
        href=""
        :class="{ active: activeLink === '商家登录' }"
        @click.prevent="setActiveLink('商家登录')"
        >商家登录</a
      >
      <text>|</text>
      <a
        href=""
        :class="{ active: activeLink === '管理端登录' }"
        @click.prevent="setActiveLink('管理端登录')"
        >管理员登录</a
      >
    </view>
    <button>登录</button>
    <button>注册</button>
  </view>
</template>

<style lang="scss">
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
  margin: 0 auto;
  width: 180px;
}
a {
  margin-right: 10px;
  margin-left: 10px;
  color: #000;
  text-decoration: none;
  &.active {
    text-decoration: underline;
    text-underline-offset: 10px;
  }
}
button {
  margin: 20px auto;
  width: 257px;
  height: 45px;
  border-radius: 5px;
}
</style>
