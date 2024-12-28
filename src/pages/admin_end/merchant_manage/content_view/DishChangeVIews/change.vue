<script lang="ts" setup>
import { ref } from 'vue'
import { getUpdateDishInfo, auditUpdateDish } from '@/services/admin/merchant_manage'
/**
 * @description 管理端商户管理子页面模块
 * @author 钟礼豪
 * @date 2024-10-27
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-27
 */

const props = defineProps({
  merchantId: {
    type: Number,
    required: true,
  },
})
interface Dish {
  name: string
  price: string
  newprice: string
}

const dishes = ref<Dish[]>()
//获取商家修改菜品价格审核信息
const handleGetInfo = async () => {
  const res = await getUpdateDishInfo(props.merchantId)
  dishes.value = res.data
  console.log('获取菜品更改价格信息:', res.data)
}
//修改菜品价格审核
const handleAudit = async (dishId: number, result: boolean) => {
  const res = await auditUpdateDish(dishId, result)
  console.log('上传菜品价格审核结果:', res.data)
}

// 组件挂载时获取数据
onMounted(() => {
  handleGetInfo()
})
</script>
<template>
  <view class="dishes-container">
    <view class="header">
      <view class="title">更改</view>
      <navigator class="nav" url="">联系商家</navigator>
    </view>

    <view v-for="dish in dishes" :key="dish.id" class="dish-card">
      <view class="dish-info">
        <view class="info-item">{{ dish.dishName }}</view>
        <view class="info-item"> 定价:{{ dish.price }}¥ -> {{ dish.newPrice }}¥</view>
      </view>
      <view class="footer">
        <view class="btns">
          <button @click="handleAudit(dish.id, true)" class="agree">同意</button>
          <button @click="handleAudit(dish.id, false)" class="disagree">不同意</button>
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
