<script lang="ts" setup>
import { ref } from 'vue'
import { downDish, getMerchantDishes } from '@/services/admin/merchant_manage'

interface Dish {
  id: number
  imageUrl: string
  dishName: string
  price: number
  dishDescription: string
}

const props = defineProps({
  merchantId: {
    type: Number,
    required: true,
  },
})
// 菜品数据
const dishes = ref<Dish[]>()
const handelGetInfo = async (merchantId: number) => {
  const res = await getMerchantDishes(props.merchantId)
  dishes.value = res.data
  console.log(res.data)
}

onLoad(handelGetInfo)

// 控制 popup 显示状态
const showPopup = ref(false)
// 当前选中的菜品 id
const currentDishId = ref<number | null>(null)

// 显示删除确认框
const showDeletePopup = (id: number) => {
  console.log(id)
  currentDishId.value = id
  showPopup.value = true
}

// 关闭删除确认框
const closePopup = () => {
  showPopup.value = false
  currentDishId.value = null
}

// 确认删除菜品
const confirmDelete = async () => {
  if (currentDishId.value !== null) {
    const res = await downDish(currentDishId.value, props.merchantId)
    if (res) {
      dishes.value = dishes.value.filter((dish) => dish.id !== currentDishId.value)
      closePopup()
    }
  }
}
</script>
<template>
  <view class="dishes-container">
    <view class="header">
      <view class="title">下架</view>
      <navigator class="nav" url="">联系商家</navigator>
    </view>

    <view v-for="dish in dishes" :key="dish.id" class="dish-card">
      <view class="logo"><image :src="dish.imageUrl" mode="aspectFill"></image></view>
      <view class="dish-info">
        <view class="info-item">{{ dish.dishName }}</view>
        <view class="info-item">{{ dish.price }}</view>
        <view class="info-item">菜品描述:{{ dish.dishDescription }}</view>
      </view>

      <view class="aside">
        <view class="deleteIcon" @click="showDeletePopup(dish.id)">
          <image src="@/static/images/deleteIcon.png" mode="aspectFill"></image>
        </view>
      </view>
    </view>

    <!-- 删除确认弹窗 -->
    <view v-if="showPopup" class="popup">
      <view class="popup-content">
        <view class="popup-header">确认删除</view>
        <view class="popup-body">您确定要删除这个菜品吗？</view>
        <view class="popup-footer">
          <button class="cancel-btn" @click="closePopup">取消</button>
          <button class="confirm-btn" @click="confirmDelete">确认</button>
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
    justify-content: space-between;
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

  /* 删除确认弹窗样式 */
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-content {
    background: white;
    padding: 20rpx;
    border-radius: 10rpx;
    width: 80%;
    max-width: 400rpx;
    text-align: center;
  }

  .popup-header {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  .popup-body {
    font-size: 26rpx;
    margin-bottom: 20rpx;
  }

  .popup-footer {
    display: flex;
    justify-content: space-around;

    .cancel-btn,
    .confirm-btn {
      font-size: 28rpx;
      padding: 10rpx 20rpx;
      border: none;
      border-radius: 5rpx;
      cursor: pointer;
    }

    .cancel-btn {
      background-color: #f1f1f1;
      color: #333;
    }

    .confirm-btn {
      background-color: #ff4d4f;
      color: white;
    }
  }
}
</style>
