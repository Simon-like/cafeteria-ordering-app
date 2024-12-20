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
  name: string
  price: string
  newprice: string
  agreed: boolean
}

const dishes = ref<Dish[]>([
  {
    id: 1,
    name: 'XXXXXXXXXXXXX0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX000000000',
    price: '20',
    newprice: '12',
    agreed: false,
  },
  {
    id: 2,
    name: 'XXXXXXXXXXXXX0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX000000000',
    price: '20',
    newprice: '12',
    agreed: false,
  },
])

const agree = (id: number) => {
  const dish = dishes.value.find((dish) => dish.id === id)
  if (dish) {
    dish.agreed = true
  }
}

const disagree = (id: number) => {
  const dish = dishes.value.find((dish) => dish.id === id)
  if (dish) {
    dish.agreed = false
  }
}
</script>
<template>
  <view class="dishes-container">
    <view class="header">
      <view class="title">更改</view>
      <navigator class="nav" url="">联系商家</navigator>
    </view>

    <view v-for="dish in dishes" :key="dish.id" class="dish-card">
      <view class="id">{{ dish.id }}</view>
      <view class="dish-info">
        <view class="info-item">{{ dish.name }} 定价:{{ dish.price }} -> {{ dish.newprice }}</view>
      </view>
      <view class="footer">
        <view class="btns">
          <button @click="agree(dish.id)" class="agree">同意</button>
          <button @click="disagree(dish.id)" class="disagree">不同意</button>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.dishes-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx; // 根据需要调整卡片之间的间距
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
    font-size: 25rpx;
    display: flex;
    flex-direction: column;
    border-radius: 8rpx; // 根据需要调整圆角大小
    padding: 15rpx;
    background-color: $bg-color-light; // 根据需要调整背景颜色
    .id {
      margin-bottom: 10rpx; // 根据需要调整ID与内容之间的间距
      white-space: nowrap;
    }
    .dish-info {
      display: flex;
      flex-direction: column;
      white-space: normal; // 允许正常换行
      gap: 10rpx; // 根据需要调整信息项之间的间距
      margin-bottom: 10rpx; // 根据需要调整信息与按钮之间的间距
      .info-item {
        text {
          white-space: nowrap;
        }
      }
    }

    .btns {
      display: flex;
      justify-content: space-between;
      width: 80%; /* 按钮容器宽度为80% */

      button {
        width: 40%; /* 每个按钮占40%的宽度 */
        padding: 0; /* 按钮的上下内边距 */
        font-size: 25rpx;
        border-radius: 25rpx;
      }
      .agree {
        background-color: $bg-color-green;
      }
      .disagree {
        background-color: $bg-color-light;
        border: 1rpx solid rgba(25, 196, 126, 0.7);
      }
    }
  }
}
</style>
