<script lang="ts" setup>
import { ref } from 'vue'
import { getAllRequestInfo } from '@/services/admin/merchant_manage'
import iconComponent from '@/components/icons/icons.vue'
import DishAddComponent from './DishChangeViews/add.vue' // 新增菜品组件
import DishEditComponent from './DishChangeViews/change.vue' // 更改菜品组件
import DishDeleteComponent from './DishChangeViews/delete.vue' // 删除菜品组件
import type { MerchantRequest } from '@/types/admin_return'
import { onLoad } from '@dcloudio/uni-app'
// 管理当前页面的视图状态
const currentView = ref('main') // 当前显示的视图，默认主页面
const selectedMerchantId = ref<number | null>(null) // 当前选中的商户ID
const merchants = ref<MerchantRequest[]>()
const handleGetInfo = async () => {
  const res = await getAllRequestInfo()
  if (res.code === 1) {
    merchants.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: '获取信息失败！',
    })
  }
}
onLoad(async () => await handleGetInfo())
const phoneNumber_selected = ref<string>('')
// 展示增添菜品页面
const showAddDish = (merchantId: number, phoneNumber: string) => {
  phoneNumber_selected.value = phoneNumber
  selectedMerchantId.value = merchantId
  currentView.value = 'addDish' // 设置视图为新增菜品
}

// 展示编辑菜品页面
const showEditDish = (merchantId: number, phoneNumber: string) => {
  phoneNumber_selected.value = phoneNumber
  selectedMerchantId.value = merchantId
  currentView.value = 'editDish' // 设置视图为编辑菜品
}

// 展示删除菜品页面
const showDeleteDish = (merchantId: number, phoneNumber: string) => {
  phoneNumber_selected.value = phoneNumber
  selectedMerchantId.value = merchantId
  currentView.value = 'deleteDish' // 设置视图为删除菜品
}

// 返回主页面
const goBack = async () => {
  currentView.value = 'main' // 返回主页面
  selectedMerchantId.value = null // 清空选中的商家ID
  await handleGetInfo()
}
</script>

<template>
  <view class="menu-manage">
    <view class="box">
      <scroll-view scroll-y class="merchant-list" v-if="currentView === 'main'">
        <view class="msg">
          <view v-for="merchant in merchants" :key="merchant.merchantId" class="msg-item">
            <view class="merchant-box">
              <view class="merchant-info">
                <view class="logo"
                  ><image
                    :src="!!merchant.logo ? merchant.logo : '/static/images/kssdt.png'"
                    mode="aspectFill"
                  ></image
                ></view>
                <view class="name">{{ merchant.merchantName }}</view>
              </view>

              <view class="operations">
                <view
                  v-if="merchant.addReqCount > 0"
                  class="msg-item"
                  @click="showAddDish(merchant.merchantId, merchant.phoneNumber)"
                >
                  新增菜品 <iconComponent :data="merchant.addReqCount" :radius="15"></iconComponent>
                </view>
                <view
                  v-if="merchant.updateReqCount > 0"
                  class="msg-item"
                  @click="showEditDish(merchant.merchantId, merchant.phoneNumber)"
                >
                  更改已有菜品信息
                  <iconComponent :data="merchant.updateReqCount" :radius="15"></iconComponent>
                </view>
                <view
                  class="msg-item"
                  @click="showDeleteDish(merchant.merchantId, merchant.phoneNumber)"
                >
                  查看当前商家菜单
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 根据currentView的值显示不同的子页面 -->
      <view v-if="currentView === 'addDish'">
        <DishAddComponent :merchantId="selectedMerchantId" :phoneNumber="phoneNumber_selected" />
      </view>

      <view v-if="currentView === 'editDish'">
        <DishEditComponent :merchantId="selectedMerchantId" :phoneNumber="phoneNumber_selected" />
      </view>

      <view v-if="currentView === 'deleteDish'">
        <DishDeleteComponent :merchantId="selectedMerchantId" :phoneNumber="phoneNumber_selected" />
      </view>

      <view v-if="currentView !== 'main'">
        <view class="back-btn" @click="goBack"><i class="iconfont icon-zuojiantou"></i></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.menu-manage {
  width: 590rpx;
  height: 100%;
  .box {
    margin: 20rpx;
    height: 75vh;

    .msg {
      margin: 20rpx;
      .msg-item {
        display: flex;
        padding-bottom: 25rpx;
      }
    }

    button {
      background-color: #fff;
      margin: 10rpx;
      border: none;
      border-radius: 5px;
      padding: 10rpx;
    }

    .dynamic-content {
      margin-top: 20rpx;
    }
  }
}

.back-btn {
  position: absolute;
  left: 180rpx;
  top: 200rpx;
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
  &:active {
    scale: 0.9;
  }
}

.merchant-box {
  width: 95%;
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: $bg-color-light;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);
}

.merchant-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32rpx;
  margin-bottom: 15rpx;
}

.logo {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  overflow: hidden;
}

.name {
  font-size: 32rpx;
  margin-left: 20rpx;
}

.operations {
  .msg-item {
    margin-top: 10rpx;
    cursor: pointer;
    font-size: 30rpx;
  }
}

.merchant-list {
  max-height: 80vh;
  overflow-y: scroll;
  padding-right: 10rpx;
}
</style>
