<script lang="ts" setup>
import { ref } from 'vue'
import iconComponent from '@/components/icons/icons.vue'
import DishAddComponent from './DishChangeViews/add.vue' // 新增菜品组件
import DishEditComponent from './DishChangeViews/change.vue' // 更改菜品组件
import DishDeleteComponent from './DishChangeViews/delete.vue' // 删除菜品组件

// 管理当前页面的视图状态
const currentView = ref('main') // 当前显示的视图，默认主页面
const selectedMerchantId = ref<number | null>(null) // 当前选中的商户ID

// 模拟商户数据
const merchants = ref([
  { id: 1, name: '商家A', addDishData: 1, editDishData: 1 },
  { id: 2, name: '商家B', addDishData: 0, editDishData: 1 },
  { id: 3, name: '商家C', addDishData: 1, editDishData: 0 },
  { id: 4, name: '商家D', addDishData: 1, editDishData: 1 },
  { id: 5, name: '商家E', addDishData: 1, editDishData: 1 },
  { id: 6, name: '商家F', addDishData: 0, editDishData: 0 },
])

// 展示增添菜品页面
const showAddDish = (merchantId: number) => {
  selectedMerchantId.value = merchantId
  currentView.value = 'addDish' // 设置视图为新增菜品
}

// 展示编辑菜品页面
const showEditDish = (merchantId: number) => {
  selectedMerchantId.value = merchantId
  currentView.value = 'editDish' // 设置视图为编辑菜品
}

// 展示删除菜品页面
const showDeleteDish = (merchantId: number) => {
  selectedMerchantId.value = merchantId
  currentView.value = 'deleteDish' // 设置视图为删除菜品
}

// 返回主页面
const goBack = () => {
  currentView.value = 'main' // 返回主页面
  selectedMerchantId.value = null // 清空选中的商家ID
}
</script>

<template>
  <view class="menu-manage">
    <view class="box">
      <scroll-view scroll-y class="merchant-list" v-if="currentView === 'main'">
        <view class="msg">
          <view v-for="merchant in merchants" :key="merchant.id" class="msg-item">
            <view class="merchant-box">
              <view class="merchant-info">
                <view class="logo"></view>
                <view class="name">{{ merchant.name }}</view>
              </view>

              <view class="operations">
                <view
                  v-if="merchant.addDishData > 0"
                  class="msg-item"
                  @click="showAddDish(merchant.id)"
                >
                  新增菜品 <iconComponent :data="merchant.addDishData" :radius="15"></iconComponent>
                </view>
                <view
                  v-if="merchant.editDishData > 0"
                  class="msg-item"
                  @click="showEditDish(merchant.id)"
                >
                  更改已有菜品信息
                  <iconComponent :data="merchant.editDishData" :radius="15"></iconComponent>
                </view>
                <view class="msg-item" @click="showDeleteDish(merchant.id)"> 下架已有菜品 </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 根据currentView的值显示不同的子页面 -->
      <view v-if="currentView === 'addDish'">
        <DishAddComponent :merchantId="selectedMerchantId" />
      </view>

      <view v-if="currentView === 'editDish'">
        <DishEditComponent :merchantId="selectedMerchantId" />
      </view>

      <view v-if="currentView === 'deleteDish'">
        <DishDeleteComponent :merchantId="selectedMerchantId" />
      </view>

      <view v-if="currentView !== 'main'">
        <button class="back-btn" @click="goBack"><i class="zuojiantou"></i></button>
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
    height: auto;

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
  left: 160rpx;
  top: 180rpx;
  padding: 10rpx;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16rpx;
  font-weight: 550;
  transition: 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  .zuojiantou {
    margin-top: 20rpx;
    width: 25rpx;
    height: 25rpx;
    border-top: 6rpx solid #b1caae;
    border-left: 6rpx solid #b1caae;
    transform: rotate(-45deg);
    margin-right: 5rpx;
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
  background-color: #ccc;
  border-radius: 50%;
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
