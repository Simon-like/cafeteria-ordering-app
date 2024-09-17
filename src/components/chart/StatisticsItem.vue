<script setup lang="ts">
/**
 * @description 数字看板统计项组件
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */
const props = defineProps({
  name: String,
  data: Number,
  changeAmount: Number,
  compareType: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <view class="statistics-item">
    <view class="item-name">{{ props.name }}</view>
    <view class="data"> {{ props.data }}<i class="iconfont icon-youjiantou-"></i></view>
    <view class="compare">
      <text v-if="props.compareType === 0">比昨日</text>
      <text v-else-if="props.compareType === 1">比上月</text>
      <text
        ><i
          class="iconfont"
          :class="{
            'icon-arrdown': props.changeAmount >= 0,
            'icon-long_arrow_down': props.changeAmount < 0,
          }"
        ></i
        >{{ props.changeAmount }}</text
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
.statistics-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 5rpx;
  font-size: 26rpx;
  .item-name {
  }
  .data {
    display: flex;
    align-items: center;
    font-size: 46rpx;
    .iconfont {
      font-size: 46rpx;
    }
  }
}
</style>
