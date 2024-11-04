<script setup lang="ts">
import StatisticsItem from '@/components/chart/StatisticsItem.vue'
import LineChart from '@/components/chart/LineChart.vue'
import PieChart from '@/components/chart/PieChart.vue'
import { getTopSellingDish, getSalesTrends, getStatistics } from '@/services/admin/admin_dashboard'
import { ref, reactive, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

/**
 * @description 管理端首页数据大屏
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

// 看板数据
const statistics_list = ref<
  {
    title: string
    value: number
    changeValue: number
  }[]
>([])

// 销量数据
const SalesTrends_categories = ref<string[]>([])
const SalesTrends_series = ref<
  {
    name: string
    data: number[]
  }[]
>([])

// 上一周最佳菜品统计数据
const SellingDishData = ref<
  {
    name: string
    value: number
  }[]
>([])

onLoad(async () => {
  const resStatistics = await getStatistics() //数据看板
  if (resStatistics.code === 1) {
    statistics_list.value = resStatistics.data.digiSignageInfoList
  } else {
    uni.showToast({
      icon: 'none',
      text: '看板数据获取失败！',
    })
  }

  const resTrends = await getSalesTrends() // 销量趋势
  if (resTrends.code === 1) {
    nextTick(() => {
      SalesTrends_series.value = [
        { name: '销量趋势统计', data: resTrends.data.map((item) => item.salesNumber) },
      ]
      SalesTrends_categories.value = resTrends.data.map((item) => item.orderTime)
    })
  } else {
    uni.showToast({
      icon: 'none',
      text: '销量趋势统计获取失败！',
    })
  }

  const resSellingDish = await getTopSellingDish() // 上一周最佳菜品统计
  if (resSellingDish.code === 1) {
    SellingDishData.value = []
    if (typeof resSellingDish.data !== 'object') resSellingDish.data = []
    nextTick(() => {
      if (resSellingDish.data.length === 0) {
        SellingDishData.value.push({ name: '暂无数据', value: 1 })
      } else {
        resSellingDish.data.forEach((item) => {
          SellingDishData.value.push({ name: item.dishName, value: item.dishSales })
        })
      }
    })
  } else {
    uni.showToast({
      icon: 'none',
      text: '上一周最佳菜品统计获取失败！',
    })
  }
})
</script>

<template>
  <view class="index">
    <view class="total-amount">
      <StatisticsItem
        v-for="item in statistics_list"
        :key="item.title"
        :name="item.title"
        :data="item.value"
        :changeAmount="item.changeValue"
      ></StatisticsItem>
    </view>
    <view class="sales-trend chart-wrapper">
      <view class="title"> 销量趋势 </view>
      <view class="chart">
        <LineChart :categories="SalesTrends_categories" :series="SalesTrends_series"></LineChart>
      </view>
    </view>
    <view class="top-dishes chart-wrapper">
      <view class="title"> 本周销量最佳菜品 </view>
      <view class="chart">
        <PieChart :data="SellingDishData"></PieChart>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.index {
  border-radius: 28rpx 28rpx 0 0;
  box-shadow: 0 -6rpx 10rpx rgba(0, 0, 0, 0.15);
  padding: 60rpx 70rpx;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .total-amount {
    width: 600rpx;
    display: flex;
    flex-wrap: wrap;
    gap: 30rpx;
    align-items: center;
    justify-content: center;
  }

  .chart-wrapper {
    width: 600rpx;
    overflow: hidden;
    border: 2px solid rgba(0, 0, 0, 0.7);
    padding: 10rpx 0;
    border-radius: 10rpx;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 10rpx 10rpx 20rpx rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20rpx;

    .title {
      margin-left: 5rpx;
      font-size: 30rpx;
      font-weight: 550;
    }
    .chart {
      width: 100%;
      height: 260rpx;
    }
  }

  .top-dishes {
    .chart {
      height: 330rpx;
    }
  }
}
</style>
