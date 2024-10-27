<script lang="ts" setup>
import { ref } from 'vue'
import iconComponent from '@/components/icons/icons.vue'
import addComponent from './DishChangeViews/add.vue'
import changeComponent from './DishChangeViews/change.vue'
import deleteComponent from './DishChangeVIews/delete.vue'
/**
 * @description 管理端商家菜单管理模块
 * @author 钟礼豪
 * @date 2024-10-11
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-12
 */

// 状态管理，用于跟踪当前显示的视图
const currentView = ref('main') // 初始视图为主页面

const showAddDish = () => {
  currentView.value = 'addDish' // 点击新增菜品时设置状态
}

const showEditDish = () => {
  currentView.value = 'editDish' // 点击更改菜品时设置状态
}
const showDeleteDish = () => {
  currentView.value = 'deleteDish' // 点击更改菜品时设置状态
}
const goBack = () => {
  currentView.value = 'main' // 返回主页面
}
</script>

<template>
  <view class="menu-manage">
    <view class="box">
      <!-- 主页面内容 -->
      <view v-if="currentView === 'main'" class="card">
        <view class="info">
          <view class="logo"></view>
          <view class="merchant">
            <view class="name">
              xxx
              <navigator url="pages/admin_end/merchant_manage/content_view/detail" class="nav">
                (点击跳转到商家信息页面)
              </navigator>
            </view>
            <view class="content">
              <text>申请修改信息</text>
              <view class="time">13:30</view>
            </view>
          </view>
        </view>
        <!-- 分割线 -->
        <view class="divider"></view>

        <view class="msg">
          <view class="msg-item" @click="showAddDish">
            新增菜品 <iconComponent :data="2" :radius="15"></iconComponent>
          </view>
          <view class="msg-item" @click="showEditDish">
            更改已有菜品信息 <iconComponent :data="3" :radius="15"></iconComponent>
          </view>
          <view class="msg-item" @click="showDeleteDish"> 下架已有菜品 </view>
        </view>
      </view>

      <!-- 新增菜品页面 -->
      <view v-else-if="currentView === 'addDish'">
        <view class="back-btn" @click="goBack()"><i class="iconfont icon-zuojiantou"></i></view>
        <addComponent></addComponent>
        <!-- 可以进一步添加表单等内容 -->
      </view>

      <!-- 更改菜品信息页面 -->
      <view v-else-if="currentView === 'editDish'">
        <view class="back-btn" @click="goBack()"><i class="iconfont icon-zuojiantou"></i></view>
        <changeComponent></changeComponent>
        <!-- 也可以添加表单或其他组件 -->
      </view>

      <!-- 下架菜品页面 -->
      <view v-else-if="currentView === 'deleteDish'">
        <view class="back-btn" @click="goBack()"><i class="iconfont icon-zuojiantou"></i></view>
        <deleteComponent></deleteComponent>
        <!-- 也可以添加表单或其他组件 -->
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.menu-manage {
  width: 610rpx;
  height: 100%;
  .box {
    margin: 20rpx;
    height: auto; /* 根据内容自适应高度 */
    .card {
      background-color: #ccc;
      .info {
        display: flex;
        position: relative;
        .logo {
          margin: 20rpx;
          height: 130rpx;
          width: 130rpx;
          border-radius: 50%;
          background-color: #fff;
        }
        .merchant {
          margin-left: 15rpx;
          margin-top: 20rpx;
          display: flex;
          flex-direction: column;
          .name {
            display: flex;
            font-size: 35rpx;
            .nav {
              font-size: 25rpx;
              color: #f5f5f5;
              text-decoration: underline;
            }
          }
          .content {
            display: flex;
            margin-top: 30rpx;
            text {
              font-size: 32rpx;
              white-space: nowrap;
            }
            .time {
              margin-left: 120rpx;
            }
          }
        }
      }
    }

    .divider {
      width: 60%;
      height: 4rpx;
      background-color: #000;
      margin-left: 20%;
      margin-bottom: 30rpx;
    }

    .msg {
      margin: 20rpx;
      .msg-item {
        display: flex;
        cursor: pointer; /* 鼠标悬停时显示为可点击 */
        padding-bottom: 25rpx;
      }
    }

    button {
      margin: 10rpx;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10rpx;
      cursor: pointer;
    }

    .dynamic-content {
      margin-top: 20rpx; /* 动态内容与上方内容的间距 */
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
  &:active {
    scale: 0.9;
  }
}
</style>
