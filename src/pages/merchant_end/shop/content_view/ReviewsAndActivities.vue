<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { componentList } from '@/pages/merchant_end/shop/content_view/RAA_view/index.ts'
/**
 * @description 店铺管理评价与活动
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-10
 */

//导航数据
const headerList = ref([
  { text: '店铺评价', active: true, index: 0 },
  { text: '公告', active: false, index: 1 },
])
//导航定位锚点
const headerIndex = ref<number>(0)
const onSwitch = (index: number) => {
  /**
   * @description 导航切换
   */
  headerIndex.value = index
  headerList.value.forEach((item) => {
    item.active = item.index === index ? true : false
  })
}
</script>

<template>
  <view class="reviews-activities">
    <!-- 导航模块 -->
    <view class="header">
      <view
        class="header-item"
        v-for="item in headerList"
        :class="{ active: item.active }"
        :key="item.index"
        @click="onSwitch(item.index)"
      >
        {{ item.text }}
      </view>
    </view>
    <!-- 主要内容模块 -->
    <component :is="componentList[headerIndex]"></component>
  </view>
</template>

<style lang="scss" scoped>
.reviews-activities {
  width: 590rpx;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 26rpx;
  gap: 25rpx;
  padding: 20rpx;
  font-size: 30rpx;
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    line-height: 40rpx;
    height: 40rpx;
    .header-item {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      font-weight: 550;
      transition: all 0.2s ease;
      &.active {
        color: $text-color-active;
      }
    }
  }
}
</style>
