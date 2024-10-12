<script lang="ts" setup>
import { ref } from 'vue'

interface Dish {
  id: number
  name: string
  price: string
  description: string
  agreed: boolean
}

const dishes = ref<Dish[]>([
  {
    id: 1,
    name: 'XXXXXXXXXXXXX0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX000000000',
    price: 'xxxx',
    description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX000000000',
    more: 'xxx',
    agreed: false,
  },
  {
    id: 2,
    name: 'XXXXXXXXX',
    price: 'xxxx',
    description: 'XXXXXXXXXXXXXXXXXXXXX',
    more: 'xxx',
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
      <view class="title">新增</view>
      <navigator class="nav" url="">联系商家</navigator>
    </view>

    <view v-for="dish in dishes" :key="dish.id" class="dish-card">
      <view class="id">{{ dish.id }}</view>
      <view class="cover">
        <text>封面:</text>
        <image src="" mode="aspectFill">logo</image>
      </view>
      <view class="dish-info">
        <view class="info-item"><text>菜品名称:</text>{{ dish.name }}</view>
        <view class="info-item"><text>菜品定价:</text>{{ dish.price }}</view>
        <view class="info-item"><text>菜品描述:</text>{{ dish.description }}</view>
        <view class="info-item"><text>附言:</text>{{ dish.more }}</view>
      </view>
      <view class="footer">
        <view class="agreement">
          <button @click="agree(dish.id)">同意</button>
          <button @click="disagree(dish.id)">不同意</button>
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
    }
    .nav {
      font-size: 25rpx;
      color: #ccc;
      text-decoration: underline;
    }
  }

  .dish-card {
    font-size: 25rpx;
    display: flex;
    flex-direction: column;
    border-radius: 8rpx; // 根据需要调整圆角大小
    padding: 15rpx;
    background-color: #ccc; // 根据需要调整背景颜色
    .id {
      margin-bottom: 10rpx; // 根据需要调整ID与内容之间的间距
      white-space: nowrap;
    }
    .cover {
      display: flex;
      align-items: center;
      gap: 10rpx; // 根据需要调整文本与图片之间的间距
      margin-bottom: 10rpx; // 根据需要调整封面与信息之间的间距
      text {
        white-space: nowrap;
      }
      .image {
        width: 50rpx; // 根据需要调整图片宽度
        height: 50rpx; // 根据需要调整图片高度
        object-fit: cover; // 确保图片填充容器而不变形
        border-radius: 4rpx; // 根据需要调整图片圆角
      }
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

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .agreement {
        display: flex;
        gap: 10px; // 根据需要调整按钮之间的间距
        button {
          font-size: 25rpx;
          padding: 5rpx 10rpx; // 根据需要调整按钮内边距
          border: none;
          border-radius: 4rpx; // 根据需要调整按钮圆角
          cursor: pointer;
          background-color: #000; // 根据需要调整按钮背景颜色
          color: white;
          transition: background-color 0.3s;
        }
      }
    }
  }
}
</style>
