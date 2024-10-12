<script setup lang="ts">
import { ref } from 'vue'

/**
 * @description 管理端区域商家信息展示模块
 * @author 钟礼豪
 * @date 2024-10-11
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-12
 */

const testInfo = ref({
  name: '食堂a',
  dishList: [
    {
      restaurant: '兰州拉面',
      logo: 'http://lzlm',
      address: '哈V',
      contactPhone: '12345678901',
      businessHours: '8:00-22:00',
      realName: '店主',
      description: '我不吃牛肉',
    },
    {
      restaurant: '新疆大盘鸡',
      logo: 'http://xjdpj',
      address: '哈V',
      contactPhone: '12345678901',
      businessHours: '8:00-22:00',
      realName: '店主',
      description: '我不吃鸡肉',
    },
  ],
})
const goToDetail = (index) => {
  console.log(index)
  uni.navigateTo({
    url: `/pages/admin_end/merchant_manage/content_view/detail?index=${index}`,
  })
}
</script>
<template>
  <view class="content">
    <view class="name">
      {{ testInfo.name }}
    </view>

    <scroll-view class="box" scroll-y="true">
      <view v-for="(dish, index) in testInfo.dishList" :key="index" class="dishList">
        <view class="logo">
          <image :src="dish.logo" class="logo"></image>
        </view>
        <view class="details">
          <view class="restaurant">{{ dish.restaurant }}</view>
          <view class="businessHours">营业时间:{{ dish.businessHours }}</view>
          <view class="contactPhone">联系电话:{{ dish.contactPhone }}</view>
          <view class="btns">
            <button @click="goToDetail(index)">查看详细信息</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  width: 610rpx;
  height: 100%;
  .name {
    font-size: 36rpx;
    width: 100%;
    height: 60rpx;
    background-color: #fff;
    display: flex;
    padding: 0 10rpx;
    justify-content: center;
    align-items: center;
  }
  .box {
    width: 100%;
    max-height: 1400rpx; /* 设置最大高度，根据需要调整 */
    overflow-y: auto; /* 当内容超出最大高度时显示滚动条 */
    display: flex;
    flex-direction: column; /* 垂直排列子元素 */
    .dishList {
      display: flex;
      align-items: center; /* 垂直居中 */
      padding: 10rpx; /* 增加内边距 */
      border-bottom: 1px solid #333; /* 增加底部边框 */
      background-color: #ccc;
      margin-bottom: 20rpx;
      height: 220rpx;
      &:last-child {
        border-bottom: none; /* 最后一个元素不显示边框 */
      }
      .logo {
        width: 170rpx; /* 设置宽度 */
        height: 170rpx; /* 设置高度 */
        margin-right: 20rpx; /* 增加右边距 */
        background-color: #000;
      }
      .details {
        display: flex;
        flex-direction: column; /* 垂直排列子元素 */
        flex-grow: 1; /* 允许元素增长填充剩余空间 */
        .restaurant,
        .businessHours,
        .contactPhone {
          margin-bottom: 5rpx; /* 增加底部边距 */
          padding: 5rpx; /* 增加内边距 */
          font-size: 25rpx;
        }
        .restaurant {
          font-size: 32rpx;
        }
      }
      .btns {
        margin-left: auto; /* 按钮靠右 */
        margin-right: 20rpx;
        margin-bottom: 25rpx;
        height: 20rpx;
        width: 280rpx;
        button {
          font-size: 20rpx; /* 设置按钮字体大小 */
          border: 1px solid black; /* 设置黑边框 */
          border-radius: 0; /* 取消圆角 */
          padding: 0;
        }
      }
    }
  }
}
</style>
