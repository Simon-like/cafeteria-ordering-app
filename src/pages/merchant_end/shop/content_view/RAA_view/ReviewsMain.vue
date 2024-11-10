<script lang="ts" setup>
import ReviewsCard from '@/pages/merchant_end/shop/content_view/RAA_components/ReviewsCard.vue'
/**
 * @description 店铺管理评价模块
 * @author 应东林
 * @date 2024-11-10
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-10
 */
</script>

<template>
  <view class="ReviewsMain">
    <scroll-view scroll-y="true" class="scroll-Y">
      <ReviewsCard />
      <ReviewsCard />
      <ReviewsCard />
      <ReviewsCard />
      <ReviewsCard />
      <ReviewsCard />
      <ReviewsCard />
      <ReviewsCard />
      <ReviewsCard />
    </scroll-view>
  </view>
</template>

<style lang="scss" scope>
.ReviewsMain {
  width: 100%;
  height: 70vh;
}
</style>
