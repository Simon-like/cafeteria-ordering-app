<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { updateCommission } from '@/services/admin/merchant_manage'
import MenuComponent from '@/pages/admin_end/merchant_manage/content_view/DishChangeViews/delete.vue'
const props = defineProps<{
  id: number
  name: string
  logo: string
  address: string
  contactPhone: string
  businessHours: string
  realName: string
  description: string
  commissionType: number
  commission: number
}>()

// 新增状态变量，用于控制抽成方式和抽成值
const commissionTypeValue = ref<number>() // 0：固定金额，1：按比例
const commissionValue = ref<number>() // 平台抽成数值
const popup = ref<any>()

onMounted(() => {
  commissionTypeValue.value = props.commissionType
  commissionValue.value = props.commission
})

// 打开弹窗
const openPopup = () => {
  popup.value.open()
}

// 关闭弹窗
const closePopup = () => {
  popup.value.close()
}

// 切换抽成方式
const onCommissionTypeChange = (event: any) => {
  commissionTypeValue.value = event.detail.value
  commissionValue.value = '' // 切换方式后，清空输入的抽成数值
}

// 更新抽成的函数
const handleUpdateCommission = async () => {
  if (!commissionValue.value) {
    uni.showToast({
      title: '请输入抽成金额或比例',
      icon: 'none',
    })
    return
  }
  const res = await updateCommission(commissionValue.value, commissionTypeValue.value, props.id)
  closePopup() // 保存后关闭弹窗
}

// 取消操作
const cancelUpdate = () => {
  closePopup() // 取消关闭弹窗
}

const showMenu = ref<boolean>(false)
const ifShowDetail = ref<boolean>(true)
//跳转到商家菜单页面
const goToMenu = (id: number) => {
  showMenu.value = true
  ifShowDetail.value = false
}
// 定义返回事件
const emits = defineEmits(['goBack'])
const goBack = () => {
  emits('goBack') // 通过事件通知父组件返回
}
const goDetail = () => {
  showMenu.value = false
  ifShowDetail.value = true
}
</script>

<template>
  <view class="back-btn isposition" @click="goDetail" v-if="showMenu">
    <i class="iconfont icon-zuojiantou"></i>
  </view>
  <MenuComponent
    :merchantId="props.id"
    :phoneNumber="props.contactPhone"
    v-if="showMenu"
    class="menu"
  ></MenuComponent>
  <view class="container" v-if="!showMenu">
    <!-- 返回按钮 -->
    <view @click="goBack" v-if="ifShowDetail" class="title-box">
      <view class="back-btn" @click="goBack"><i class="iconfont icon-zuojiantou"></i></view>
      <view class="title">区域商家详细信息</view>
    </view>
    <view class="info">
      <!-- 店铺信息展示部分 -->
      <view class="info-item">
        <image :src="props.logo" class="logo"></image>
        <view class="name">店铺名称：{{ props.name }}</view>
      </view>
      <view class="info-item">营业时间: {{ props.businessHours }}</view>
      <view class="info-item">地址: {{ props.address }}</view>
      <view class="info-item">联系电话: {{ props.contactPhone }}</view>
      <view class="info-item">店铺简介: {{ props.description }}</view>
      <view class="info-item"
        >店铺菜单:<span class="nav" @click="goToMenu(props.id)">点击跳转</span></view
      >
      <!-- 平台抽成部分 -->
      <view class="info-item">
        <view style="white-space: nowrap">平台抽成:</view>
        <view class="commission-info">
          <view>
            <!-- 显示当前抽成方式和金额/比例 -->
            <span v-if="commissionType === 0">{{ commissionValue }}/单</span>
            <span v-else>{{ commissionValue * 100 }}%</span>
          </view>
          <button @click="openPopup" class="edit-button">修改</button>
        </view>
      </view>
    </view>

    <!-- 使用 uni-popup 弹窗 -->
    <uni-popup ref="popup" type="center" @close="closePopup">
      <view class="popup-content">
        <view class="popup-header">修改平台抽成</view>
        <view class="popup-body">
          <view class="form-group">
            <label>选择抽成方式</label>
            <picker
              mode="selector"
              :value="commissionTypeValue"
              range-key="label"
              :range="[
                { label: '固定金额', value: 0 },
                { label: '按比例', value: 1 },
              ]"
              @change="onCommissionTypeChange"
            >
              <view class="picker">
                {{ commissionTypeValue === 0 ? '固定金额' : '按比例' }}
              </view>
            </picker>
          </view>
          <view class="form-group">
            <label v-if="commissionTypeValue === 0">请输入固定金额</label>
            <label v-else>请输入抽成比例 (如 0.05)</label>
            <input v-model="commissionValue" type="number" placeholder="请输入金额或比例" />
          </view>
        </view>
        <view class="popup-footer">
          <button @click="handleUpdateCommission">保存</button>
          <button @click="cancelUpdate">取消</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style scoped>
.menu {
  width: 100%;
  max-width: 590rpx;
  max-height: 1350rpx;
  overflow-y: auto;
  padding: 20rpx;
  font-size: 30rpx;
}

.container {
  max-width: 590rpx;
  margin-top: 50rpx;
  padding: 20rpx;
  font-size: 30rpx;
}

.info {
  background-color: white;
  border-radius: 10rpx;
  padding: 20rpx;
}

.info-item {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  object-fit: cover;
}

.name {
  font-weight: bold;
  font-size: 30rpx;
}

.commission-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.edit-button {
  padding: 8rpx 20rpx;
  background-color: #4caf50;
  color: white;
  border-radius: 20rpx;
  font-size: 28rpx;
  border: none;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #45a049; /* 添加悬浮效果 */
}

.popup-content {
  padding: 40rpx;
  background-color: white;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1); /* 弹窗阴影 */
}

.popup-header {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
  color: #333;
}

.popup-body {
  .form-group {
    margin-bottom: 30rpx;
    label {
      font-size: 30rpx;
      display: block;
      margin-bottom: 12rpx;
      color: #a9ffa8;
    }

    input,
    .picker {
      font-size: 30rpx;
      padding: 12rpx;
      width: 100%;
      border: 2rpx solid #ccc;
      border-radius: 8rpx;
      background-color: #f9f9f9;
      margin-bottom: 15rpx;
    }

    input:focus,
    .picker:focus {
      border-color: #4caf50; /* 聚焦时的边框颜色 */
    }
  }
}

.popup-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
}

.save-button,
.cancel-button {
  padding: 12rpx 25rpx;
  font-size: 30rpx;
  border-radius: 8rpx;
  width: 45%;
  border: none;
  cursor: pointer;
}

.nav {
  color: #ccc;
  text-decoration: underline;
  margin-right: 250rpx;
}
.title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 12rpx;
}
.back-btn {
  padding: 8rpx;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16rpx;
  font-weight: 550;
  transition: 0.2s ease;
  text-align: center;

  .icon-zuojiantou {
    font-size: 40rpx;
    color: #fff;
  }
  &.isposition {
    position: absolute;
    left: 180rpx;
    top: 200rpx;
    z-index: 99;
  }
  &:active {
    scale: 0.9;
  }
}
</style>
