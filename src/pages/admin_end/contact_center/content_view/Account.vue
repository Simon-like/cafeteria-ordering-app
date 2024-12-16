<script lang="ts" setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/modules/admin_information'
import { gotoLoginAndRegister } from '@/composables/navigation/navigation'

/**
 * @description 管理端联络中心页面账号管理模块
 * @author 应东林 钟礼豪
 * @date 2024-10-12
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-12-11
 */

const adminStore = useAdminStore()
/**
 * 图片上传功能
 */
const logoPickerPopup = ref()
const fileList1 = ref<Object[]>([])

const openLogoPicker = () => {
  logoPickerPopup.value.open('center')
}

// 新增图片
const afterRead = async (event: Object) => {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file)
  lists.map((item) => {
    fileList1.value.push({
      ...item,
    })
  })
}

// 删除图片
const deletePic = (event: any) => {
  fileList1.value.splice(event.index, 1)
}

const uploadImg = async () => {
  for (let i = 0; i < fileList1.value.length; i++) {
    console.log(fileList1.value[i])
    const result = await upload('/merchant/uploadMerchantImage', fileList1.value[i].url)
    HandleGetInfo()
    uni.showToast({
      title: `图片修改成功！`,
    })
    logoPickerPopup.value.close()
  }
}
</script>

<template>
  <view class="account-mana">
    <view class="platform-logo">
      <image :src="adminStore.logo" mode="aspectFill" class="logo" @click="openLogoPicker()"></image
    ></view>
    <view class="content">
      <view class="content-items"> 学校:{{ adminStore.college }}</view>
      <view class="content-items">联系电话:{{ adminStore.phoneNumber }}</view>
    </view>
    <view class="outlogin"><button>修改资料</button></view>
    <view class="outlogin"><button>生成个人邀请码</button></view>
    <view class="outlogin" @click="gotoLoginAndRegister"><button>退出登录</button></view>
  </view>
</template>

<style lang="scss" scoped>
.account-mana {
  width: 590rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 26rpx;
  gap: 44rpx;

  .platform-logo {
    margin: 20rpx auto;
    .logo {
      width: 200rpx;
      height: 200rpx;
      border: 2px solid rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .content {
    margin-left: 20rpx;
    background-color: $bg-color-light;
    width: 100%;
    padding-left: 20rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    .content-items {
      margin-bottom: 20rpx;
    }
  }
  .outlogin {
    margin: 0 auto;
    button {
      font-size: 28rpx;
      background-color: $bg-color-green;
      color: #000;
      width: 300rpx;
      padding: 5rpx 10rpx;
      border-radius: 40rpx;
      text-align: center;
      &:active {
        opacity: 0.8;
        transform: scale(0.95);
      }
    }
  }
}
</style>
