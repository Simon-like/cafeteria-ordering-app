<script lang="ts" setup>
import { ref } from 'vue'
import { getAddDishInfo, auditAddDish } from '@/services/admin/merchant_manage'
/**
 * @description 管理端商户管理子页面模块
 * @author 钟礼豪
 * @date 2024-10-27
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-12-19
 */

const props = defineProps({
  merchantId: {
    type: Number,
    required: true,
  },
})

interface Dish {
  id: number
  name: string
  price: string
  description: string
  more?: string // 添加 optional 属性 more
}

const dishes = ref<Dish[]>()
//获取商家新增菜品审核信息
const handleGetInfo = async () => {
  const res = await getAddDishInfo(props.merchantId)
  dishes.value = res.data
  console.log('新增菜品信息:', res.data)
}
//上传审核结果
const handleAudit = async (dishId: number, result: boolean) => {
  const dish = dishes.value.find((dish) => dish.id === id)
  const res = await auditAddDish(dishId, result)
  console.log('新增菜品审核结果:', res.data)
}
// 组件挂载时获取数据
onMounted(() => {
  handleGetInfo()
})
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
        <view class="info-item">
          <view class="title">菜品名称:</view>
          <view class="value">{{ dish.name }}</view>
        </view>
        <view class="info-item">
          <view class="title">菜品定价:</view>
          <view class="value">{{ dish.price }}</view>
        </view>
        <view class="info-item">
          <view class="title">菜品描述:</view>
          <view class="value">{{ dish.description }}</view>
        </view>
        <view class="info-item">
          <view class="title">附言:</view>
          <view class="value">{{ dish.more }}</view>
        </view>
      </view>
      <view class="footer">
        <view class="btns">
          <button @click="handleGetInfo(dish.id, true)" class="agree">同意</button>
          <button @click="handleGetInfo(dish.id, false)" class="disagree">不同意</button>
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
    width: 100%;
    font-size: 25rpx;
    display: flex;
    flex-direction: column;
    border-radius: 8rpx; // 根据需要调整圆角大小
    padding: 15rpx;
    background-color: $bg-color-light; // 根据需要调整背景颜色
    .id {
      margin-bottom: 10rpx; // 根据需要调整ID与内容之间的间距
      white-space: nowrap;
      color: $text-color-green;
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
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10rpx; // 根据需要调整信息项之间的间距
      margin-bottom: 10rpx; // 根据需要调整信息与按钮之间的间距
      .info-item {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
    }

    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 10rpx;

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
}
</style>
