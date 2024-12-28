<script lang="ts" setup>
import ReviewsCard from '@/pages/merchant_end/shop/content_view/RAA_components/ReviewsCard.vue'
import { getAllReviews } from '@/services/merchant/merchant_api'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import type { ReviewsType } from '@/types/merchant_return'
import { ref, nextTick } from 'vue'
/**
 * @description 店铺管理评价模块
 * @author 应东林
 * @date 2024-11-10
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-10
 */

const ReviewsData = ref<ReviewsType[]>([])
function formatDateTime(dateString: string) {
  // 创建一个 Date 对象
  const date = new Date(dateString)

  // 获取月份、日期、小时和分钟
  const month = date.getMonth() + 1 // 月份是从 0 开始的，所以加 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // 格式化为 MM-DD HH:mm 形式
  const formattedDate = `${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}  ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  return formattedDate
}

onLoad(async () => {
  const res = await getAllReviews()
  if (res.code === 1) {
    ReviewsData.value = res.data
    ReviewsData.value.forEach((item, index, arr) => {
      arr[index].date = formatDateTime(item.date)
    })
    console.log(ReviewsData.value)
  } else {
    uni.showToast({
      icon: 'none',
      title: '获取评价消息失败！',
    })
  }
})
</script>

<template>
  <view class="ReviewsMain">
    <scroll-view scroll-y="true" class="scroll-Y">
      <view class="null-content" v-show="ReviewsData.length === 0">暂时没有评价消息</view>
      <ReviewsCard v-for="item in ReviewsData" :ReviewsInfo="item" :key="item.date" />
    </scroll-view>
  </view>
</template>

<style lang="scss" scope>
.ReviewsMain {
  width: 100%;
  height: 70vh;
  position: relative;

  .null-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font-size: 36rpx;
    font-weight: 600;
  }
}
</style>
