<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { getMerchantInfo } from '@/services/admin/merchant_manage'
import type { AllInfo, MerchantInfo } from '@/types/merchant_return'
import { useAdminStore } from '@/stores'
import DetailComponent from './detail.vue'

const adminStore = useAdminStore()

// 状态管理
const ifShowDetail = ref(false)
const currentMerchantDetail = ref<MerchantInfo | null>(null)
const Info = ref<AllInfo[]>([])

// 获取商户信息
const handleGetInfo = async () => {
  try {
    const res = await getMerchantInfo(adminStore.college)
    Info.value = res.data || []
    console.log(Info.value)
  } catch (error) {
    console.error('Error fetching merchant info:', error)
  }
}

onMounted(() => {
  handleGetInfo()
})

// 食堂名称选择
const placeOptions = computed(() => {
  return Info.value.map((item) => item.place)
})

// 默认选择第一个食堂（如果存在）
const selectedPlaceIndex = ref<number>(-1)

// 观察 `placeOptions` 变化，并在其改变时更新 `selectedPlaceIndex`
watch(
  placeOptions,
  (newPlaceOptions) => {
    if (newPlaceOptions.length > 0 && selectedPlaceIndex.value === -1) {
      selectedPlaceIndex.value = 0
    }
  },
  { immediate: true },
)

// 当前选中的食堂名称
const selectedPlaceName = computed(() => placeOptions.value[selectedPlaceIndex.value] || '')

// 根据选中的食堂索引过滤商户信息
const filteredMerchants = computed(() => {
  const selectedPlace = placeOptions.value[selectedPlaceIndex.value]
  return Info.value
    .filter((item) => item.place === selectedPlace)
    .flatMap((item) => item.merchantDeInfo) // 取出商户信息列表
})

// 选择食堂
const selectPlace = (index: number) => {
  selectedPlaceIndex.value = index
}

// 查看商户详细信息
const showDetail = (index: number) => {
  const merchant = filteredMerchants.value[index]
  if (merchant) {
    currentMerchantDetail.value = merchant // 设置当前商户详细信息
    ifShowDetail.value = true
  }
}

// 返回
const goBack = () => {
  ifShowDetail.value = false
}
</script>

<template>
  <view class="content" v-if="!ifShowDetail">
    <!-- 食堂选择下拉框 -->
    <view class="place-picker">
      <picker
        :value="selectedPlaceIndex"
        :range="placeOptions"
        @change="(e) => selectPlace(e.detail.value)"
      >
        <view class="picker-btn">{{ selectedPlaceName }}</view>
      </picker>
    </view>

    <!-- 展示商户信息 -->
    <scroll-view class="box" scroll-y>
      <view v-for="(merchant, index) in filteredMerchants" :key="index" class="dishList">
        <view class="logo">
          <image :src="merchant.logo" class="logo" />
        </view>
        <view class="details">
          <view class="name">{{ merchant.name }}</view>
          <view class="businessHours">营业时间: {{ merchant.businessHours }}</view>
          <view class="contactPhone">联系电话: {{ merchant.contactPhone }}</view>
          <view class="btns">
            <button @click="() => showDetail(index)">查看详细信息</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>

  <!-- 商户详细信息显示部分 -->
  <DetailComponent
    v-if="ifShowDetail"
    :id="currentMerchantDetail?.id"
    :name="currentMerchantDetail?.name"
    :logo="currentMerchantDetail?.logo"
    :address="currentMerchantDetail?.address"
    :contactPhone="currentMerchantDetail?.contactPhone"
    :businessHours="currentMerchantDetail?.businessHours"
    :realName="currentMerchantDetail?.realName"
    :description="currentMerchantDetail?.description"
    :commissionType="currentMerchantDetail?.commissionType"
    :commission="currentMerchantDetail?.commission"
    @goBack="goBack"
  />
</template>

<style lang="scss" scoped>
.content {
  width: 590rpx;
  height: 100%;
  padding: 15rpx;
}

.place-picker {
  margin-bottom: 20rpx;
  font-size: 30rpx;
  .picker-btn {
    text-align: center;
  }
}

.box {
  font-size: 24rpx;
  width: 100%;
  min-height: 500rpx;
  max-height: 1400rpx;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.dishList {
  display: flex;
  padding: 10rpx;
  margin-bottom: 20rpx;
  background-color: $bg-color-light;
}

.logo {
  width: 170rpx;
  height: 170rpx;
  margin-right: 15rpx;
  background-color: #e0e0e0;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
}

.name {
  margin-bottom: 5rpx;
  font-size: 30rpx;
  color: #000;
}
.businessHours,
.contactPhone {
  margin-bottom: 5rpx;
  color: $text-color-active;
}

.btns {
  margin-left: auto;
  margin-right: 20rpx;
  margin-top: 25rpx;
}

button {
  width: 250rpx;
  font-size: 20rpx;
  background-color: $bg-color-green;
  border-radius: 10rpx;
  padding: 0;
}
</style>
