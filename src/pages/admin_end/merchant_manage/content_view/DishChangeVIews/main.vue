<script lang="ts" setup>
import iconComponent from '@/components/icons/icons.vue'
</script>

<template>
  <view class="menu-manage">
    <view class="box">
      <view class="info">
        <view class="logo"></view>
        <view class="merchant">
          <view class="name"
            >xxx<navigator url="./detail" class="nav"> (点击跳转到商家信息页面) </navigator></view
          >

          <view class="content">
            <text>申请修改信息</text>
            <view class="time">13:30</view>
          </view>
        </view>
      </view>
      <!-- 分割线 -->
      <view class="divider"></view>

      <view class="msg">
        <view class="msg-item">
          新增菜品 <iconComponent :data="2" :radius="15"></iconComponent
        ></view>
        <view class="msg-item">
          更改已有菜品信息<iconComponent :data="3" :radius="15"></iconComponent>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.menu-manage {
  width: 100%;
  .box {
    margin: 20rpx 20rpx 20rpx 20rpx;
    height: 350rpx;
    background-color: #ccc;
    .info {
      display: flex;
      position: relative; /* 新增，为分割线定位 */
      .logo {
        margin: 20rpx 20rpx 20rpx 20rpx;
        height: 130rpx;
        width: 130rpx;
        border-radius: 50%;
        background-color: #000;
      }
      .merchant {
        margin-left: 15rpx;
        margin-top: 20rpx;
        display: flex;
        width: auto;
        height: 80rpx;
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
          position: relative;
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

    .divider {
      width: 60%; /* 分割线宽度 */
      height: 4rpx; /* 分割线高度 */
      background-color: #000; /* 分割线颜色 */
      margin-left: 20%;
      margin-bottom: 30rpx;
    }

    .msg {
      margin: 20rpx 20rpx 20rpx 20rpx;
      .msg-item {
        display: flex;
        margin-bottom: 15rpx;
      }
    }
  }
}
</style>
