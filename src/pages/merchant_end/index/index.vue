<script setup lang="ts">
import StatisticsItem from '@/components/chart/StatisticsItem.vue'
import LineChart from '@/components/chart/LineChart.vue'
import PieChart from '@/components/chart/PieChart.vue'
import { ref } from 'vue'

/**
 * @description 商家端首页数据大屏
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

const statistics_list = ref([
  { name: '今日总成交单数', data: 1.0, changeAmount: 0 },
  { name: '食堂单数', data: 0, changeAmount: 0 },
  { name: '外送单数', data: 0, changeAmount: 0 },
  { name: '预计今日收入', data: 0, changeAmount: 0 },
])
</script>

<template>
  <view class="index">
    <view class="total-amount">
      <StatisticsItem
        v-for="item in statistics_list"
        :key="item.name"
        :name="item.name"
        :data="item.data"
        :changeAmount="item.changeAmount"
      ></StatisticsItem>
      <StatisticsItem
        :name="'本月总收入'"
        :data="0"
        :changeAmount="0"
        :compareType="1"
      ></StatisticsItem>
    </view>
    <view class="sales-trend chart-wrapper">
      <view class="title"> 销量趋势 </view>
      <view class="chart">
        <LineChart></LineChart>
      </view>
    </view>
    <view class="top-dishes chart-wrapper">
      <view class="title"> 本周销量最佳菜品 </view>
      <view class="chart">
        <PieChart></PieChart>
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
