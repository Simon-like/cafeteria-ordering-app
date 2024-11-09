<script lang="ts" setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/modules/admin_information'
import { admin_forget } from '@/services/admin/admin_api'
import { gotoLogin } from '@/composables/navigation/navigation'
/**
 * @description alert函数在移动端不可用！后面请统一使用uni.Toast
 * @author 钟礼豪
 * @date 2024-09-不知道什么时候
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-27
 */
const adminStore = useAdminStore()
const password_1 = ref<string>()
const password_2 = ref<string>()
const handleForget = async () => {
  if (password_1.value === password_2.value) {
    adminStore.password = password_1.value
  } else {
    uni.showToast({
      icon: 'none',
      title: '两次输入密码不同',
    })
    return
  }
  admin_forget(adminStore.password, adminStore.phoneNumber).then((response) => {
    uni.showToast({
      icon: 'none',
      title: '修改成功',
    })
    gotoLogin()
  })
}
</script>
<template>
  <view class="body">
    <view class="title"> 找回密码 </view>
    <view class="input">
      <view class="newpassword">
        <text>新的密码</text>
        <input type="text" v-model="password_1" />
      </view>
      <view class="confirm">
        <text>确认密码</text>
        <input type="text" class="input_password" v-model="password_2" />
      </view>
      <button class="submit" @click="handleForget">确认</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100vw;
}
.title {
  font-size: 40rpx;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
}
.input {
  display: flex;
  flex-direction: column;
  margin-left: 120rpx;
  width: 80%;
  .newpassword,
  .confirm {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;

    input {
      height: 50rpx;
      margin-left: 30rpx;
      padding: 4px 0 3px 8px;
      border: 1px solid $text-color-green;
      background-color: $bg-color-light;
      border-radius: 8px;
    }
  }
  .submit {
    margin: 40rpx 50rpx;
    width: 470rpx;
    height: 90rpx;
    border-radius: 5px;
    border: $text-color-green solid 1rpx;
    background-color: $bg-color-green;
  }
}
</style>
