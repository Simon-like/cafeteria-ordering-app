<script lang="ts" setup>
import { ref } from 'vue'
/**
 * @description 管理端商户管理子页面模块
 * @author 钟礼豪
 * @date 2024-10-27
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-27
 */
interface Dish {
  id: number
  logo: string
  name: string
  price: number
  description: string
}

const dishes = ref<Dish>([
  {
    id: 1,
    logo: '',
    name: '1',
    price: 9.9,
    description: '12',
  },
  {
    id: 2,
    logo: '',
    name: '2',
    price: 9.9,
    description: '12',
  },
])
</script>
<template>
  <view class="dishes-container">
    <view class="header">
      <view class="title">下架</view>
      <navigator class="nav" url="">联系商家</navigator>
    </view>

    <view v-for="dish in dishes" :key="dish.id" class="dish-card">
      <view class="logo"><image src="" mode="aspectFill">logo</image></view>
      <view class="dish-info">
        <view class="info-item">{{ dish.name }}</view>
        <view class="info-item">{{ dish.price }}</view>
        <view class="info-item">菜品描述:{{ dish.description }}</view>
      </view>

      <view class="aside">
        <view class="deleteIcon">
          <image src="@/static/images/deleteIcon.png" mode="aspectFill"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.dishes-container {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between; // 使标题居中，联系商家居右
    align-items: center;
    margin-left: 40%;
    padding: 10rpx;
    .title {
      font-size: 35rpx;
      font-weight: bold;
      color: $text-color-green;
    }
    .nav {
      font-size: 25rpx;
      color: $text-color-green;
      text-decoration: underline;
    }
  }

  .dish-card {
    display: flex;
    align-items: center;
    padding: 15rpx;
    background-color: $bg-color-light;
    margin-bottom: 10rpx;
    .logo {
      width: 150rpx;
      height: 150rpx;
      margin-right: 15rpx;
      background-color: #fff;
    }

    .dish-info {
      font-size: 26rpx;
      height: 180rpx;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin-right: 15rpx;
      .info-item {
        margin-bottom: 5rpx;
      }
    }

    .aside {
      width: 80rpx;
      .deleteIcon {
        width: 100%;
        height: 80rpx;
      }
    }
  }
}
</style>
