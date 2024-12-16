<script setup lang="ts">
import { ref, computed } from 'vue'

/**
 * @description 管理端区域商家信息展示模块
 * @author 钟礼豪
 * @date 2024-10-11
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-12
 */

// 模拟数据
const testInfo = ref([
  {
    place: '食堂a',
    merchantInfoList: [
      {
        name: '兰州拉面',
        logo: 'http://lzlm',
        address: '哈V',
        contactPhone: '12345678901',
        businessHours: '8:00-22:00',
        realName: '店主',
        description: '我不吃牛肉',
      },
      {
        name: '新疆大盘鸡',
        logo: 'http://xjdpj',
        address: '哈V',
        contactPhone: '12345678901',
        businessHours: '8:00-22:00',
        realName: '店主',
        description: '我不吃鸡肉',
      },
    ],
  },
  {
    place: '食堂b',
    merchantInfoList: [
      {
        name: '2-1',
        logo: 'http://lzlm',
        address: '哈V',
        contactPhone: '12345678901',
        businessHours: '8:00-22:00',
        realName: '店主',
        description: '我不吃牛肉',
      },
      {
        name: '新疆大盘鸡',
        logo: 'http://xjdpj',
        address: '哈V',
        contactPhone: '12345678901',
        businessHours: '8:00-22:00',
        realName: '店主',
        description: '我不吃鸡肉',
      },
    ],
  },
])

// 获取所有的食堂名称，供选择使用
const placeOptions = computed(() => {
  return testInfo.value.length > 0 ? testInfo.value.map((item) => item.place) : []
})

// 默认选择第一个食堂
const selectedPlaceIndex = ref(0)

// 根据选中的食堂索引过滤商户信息
const filteredMerchants = computed(() => {
  const placeData = testInfo.value[selectedPlaceIndex.value]
  return placeData ? placeData.merchantInfoList : []
})

// 切换食堂
const selectPlace = (index: number) => {
  if (index >= 0 && index < placeOptions.value.length) {
    selectedPlaceIndex.value = index
  }
}

// 查看商户详情
const goToDetail = (place, merchantIndex) => {
  console.log(place, merchantIndex)
  uni.navigateTo({
    url: `/pages/admin_end/merchant_manage/content_view/detail?place=${place}&merchantIndex=${merchantIndex}`,
  })
}
</script>
<template>
  <view class="content">
    <!-- 食堂选择下拉框 -->
    <view class="place-picker">
      <picker
        :value="selectedPlaceIndex"
        :range="placeOptions"
        @change="(e) => selectPlace(e.detail.value)"
      >
        <view class="picker-btn"> 当前选择食堂：{{ placeOptions[selectedPlaceIndex] }} </view>
      </picker>
    </view>

    <!-- 展示商户信息 -->
    <scroll-view class="box" scroll-y="true">
      <view v-for="(merchant, index) in filteredMerchants" :key="index" class="dishList">
        <view class="logo">
          <image :src="merchant.logo" class="logo"></image>
        </view>
        <view class="details">
          <view class="name">{{ merchant.name }}</view>
          <view class="businessHours">营业时间:{{ merchant.businessHours }}</view>
          <view class="contactPhone">联系电话:{{ merchant.contactPhone }}</view>
          <view class="btns">
            <button @click="goToDetail(selectedPlace, index)">查看详细信息</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  width: 590rpx;
  height: 100%;
  padding: 15rpx;

  .place-picker {
    margin-bottom: 20rpx;
    font-size: 30rpx;
    .picker-btn {
      padding: 10rpx;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      border-radius: 5rpx;
      text-align: center;
    }
  }

  .box {
    width: 100%;
    max-height: 1400rpx;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .dishList {
      display: flex;
      align-items: center;
      padding: 10rpx;
      border-bottom: 1px solid #333;
      background-color: $bg-color-light;
      margin-bottom: 20rpx;
      height: 220rpx;

      .logo {
        width: 170rpx;
        height: 170rpx;
        margin-right: 20rpx;
        background-color: #000;
      }

      .details {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .name {
          margin-bottom: 5rpx;
          padding: 5rpx;
          font-size: 35rpx;
        }
        .businessHours,
        .contactPhone {
          margin-bottom: 5rpx;
          padding: 5rpx;
          font-size: 25rpx;
          color: $text-color-active;
        }

        .name {
          font-size: 32rpx;
        }
      }

      .btns {
        margin-left: auto;
        margin-right: 20rpx;
        margin-bottom: 25rpx;
        height: 20rpx;
        width: 280rpx;

        button {
          font-size: 20rpx;
          background-color: $bg-color-green;
          border-radius: 10rpx;
          padding: 0;
        }
      }
    }
  }
}
</style>
