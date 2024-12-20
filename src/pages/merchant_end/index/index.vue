<script setup lang="ts">
import StatisticsItem from '@/components/chart/StatisticsItem.vue'
import LineChart from '@/components/chart/LineChart.vue'
import PieChart from '@/components/chart/PieChart.vue'
import { ref, nextTick } from 'vue'
import {
  getTopSellingDish,
  getSalesTrends,
  getStatistics,
} from '@/services/merchant/merchant_dashboard'

/**
 * @description 商家端首页数据大屏
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-12
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
/**
 * 将日期字符串 "YYYY-MM-DD" 分割成 "MM-DD" 格式
 * @param {string} dateStr - 输入的日期字符串，例如 "2024-12-08"
 * @returns {string} - 返回的月日字符串，例如 "12-08"
 */
function extractMonthAndDay(dateStr: string): string {
  // 检查输入是否合法
  if (!dateStr || typeof dateStr !== 'string') {
    throw new Error('输入必须是有效的字符串')
  }

  // 使用 split() 方法分割字符串
  const parts: string[] = dateStr.split('-')

  // 确保分割后的数组有三个部分 (年、月、日)
  if (parts.length !== 3) {
    throw new Error('输入字符串格式不正确，必须是 YYYY-MM-DD')
  }

  // 提取月和日
  const month = parts[1]
  const day = parts[2]

  // 返回组合后的字符串
  return `${month}.${day}`
}

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
      if (typeof resTrends.data.dateList !== 'object') resTrends.data.dateList = []
      if (typeof resTrends.data.orderCountList !== 'object') resTrends.data.orderCountList = []
      SalesTrends_series.value = [{ name: '销量趋势统计', data: resTrends.data.orderCountList }]
      SalesTrends_categories.value = resTrends.data.dateList
      SalesTrends_categories.value = SalesTrends_categories.value.map(extractMonthAndDay)
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
    nextTick(() => {
      if (typeof resSellingDish.data !== 'object') resSellingDish.data = []
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
