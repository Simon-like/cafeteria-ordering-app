<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getMerchantInfo } from '@/services/admin/merchant_manage'
import { useAdminStore } from '@/stores'
import detailComponent from './detail.vue'

interface MerchantInfo {
  id: string
  place: string
  merchantDeInfo: [
    {
      name: string
      logo: string
      address: string
      contactPhone: string
      businessHours: string
      realName: string
      description: string
    },
  ]
}

const adminStore = useAdminStore()
const ifShowDetail = ref(false)
const currentMerchantDetail = ref<MerchantInfo>(null)

onMounted(() => {
  handleGetInfo()
})

const Info = ref<MerchantInfo[]>([])

const handleGetInfo = async () => {
  const res = await getMerchantInfo('圣地v专')
  Info.value = res.data
  console.log(res.data)
}

// 获取所有的食堂名称，供选择使用，并去除重复项
const placeOptions = computed(() => {
  const places = new Set(Info.value.map((item) => item.place))
  return Array.from(places)
})

// 默认选择第一个食堂，但仅当placeOptions非空时
const selectedPlaceIndex = ref(0)
if (placeOptions.value.length > 0) {
  selectedPlaceIndex.value = 0
}

// 根据选中的食堂索引过滤商户信息
const filteredMerchants = computed(() => {
  if (Info.value.length === 0 || selectedPlaceIndex.value >= Info.value.length) {
    return []
  }
  const selectedPlace = placeOptions.value[selectedPlaceIndex.value]
  return Info.value
    .filter((item) => item.place === selectedPlace)
    .map((item) => item.merchantDeInfo)
    .flat()
})

const selectPlace = (index: number) => {
  if (index >= 0 && index < placeOptions.value.length) {
    selectedPlaceIndex.value = index
  }
}

const showDetail = (index: number) => {
  const merchant = filteredMerchants.value[index]
  if (merchant) {
    currentMerchantDetail.value = merchant
    console.log(currentMerchantDetail.value)
    ifShowDetail.value = true
  }
}

const goBack = () => {
  ifShowDetail.value = false
}

// 当前选中的食堂名称
const selectedPlaceName = computed(() => placeOptions.value[selectedPlaceIndex.value])
</script>

<template>
  <view class="content" v-if="!ifShowDetail">
    <!-- 食堂选择下拉框 -->
    <view class="place-picker">
      <picker
        :value="selectedPlaceIndex.value"
        :range="placeOptions"
        @change="(e) => selectPlace(e.detail.value)"
      >
        <view class="picker-btn">{{ selectedPlaceName }}</view>
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
            <button @click="showDetail(index)">查看详细信息</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>

  <!--商户详细信息显示部分-->
  <detailComponent
    v-if="ifShowDetail"
    :id="currentMerchantDetail.id"
    :name="currentMerchantDetail.name"
    :logo="currentMerchantDetail.logo"
    :address="currentMerchantDetail.address"
    :contactPhone="currentMerchantDetail.contactPhone"
    :businessHours="currentMerchantDetail.businessHours"
    :realName="currentMerchantDetail.realName"
    :description="currentMerchantDetail.description"
    :commissionType="currentMerchantDetail.commissionType"
    :commission="currentMerchantDetail.commission"
  >
  </detailComponent>
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
      position: relative;
      text-align: center;
    }
  }

  .box {
    font-size: 24rpx;
    width: 100%;
    min-height: 500rpx; /* 设置最小高度，确保内容能够显示 */
    max-height: 1400rpx; /* 你可以根据实际需求调整这个值 */
    overflow-y: auto; /* 如果内容超出box的高度，允许滚动 */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .dishList {
    display: flex;
    justify-content: flex-start; /* 内容从左向右排列 */
    align-items: flex-start; /* 垂直顶部对齐 */
    padding: 10rpx;
    margin-bottom: 20rpx;
    background-color: $bg-color-light;
    border-bottom: 1px solid #333;
    box-sizing: border-box;
  }

  .logo {
    width: 170rpx; /* 固定宽度 */
    height: 170rpx; /* 固定高度 */
    background-color: #000;
    margin-right: 15rpx; /* 给logo右边添加间距 */
  }

  .details {
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* 右侧内容自适应占据剩余空间 */
    justify-content: flex-start; /* 顶部对齐 */
    white-space: nowrap;
    .name {
      margin-bottom: 5rpx;
      padding: 5rpx;
    }

    .businessHours,
    .contactPhone {
      margin-bottom: 5rpx;
    }

    .btns {
      margin-left: auto;
      margin-right: 20rpx;
      margin-bottom: 25rpx;
      height: 20rpx;
      width: 280rpx;

      button {
        width: 250rpx;
        font-size: 20rpx;
        background-color: $bg-color-green;
        border-radius: 10rpx;
        padding: 0;
      }
    }
  }
}
</style>
