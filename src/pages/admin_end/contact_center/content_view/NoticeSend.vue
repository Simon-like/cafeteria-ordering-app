<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'

/**
 * @description 管理端个人中心页面系统公告发布模块
 * @author 应东林
 * @date 2024-10-11
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-11
 */

const scrollTop = ref<number>(0)

const goTop = (e: any) => {
  scrollTop.value = 1
  // 解决view层不同步的问题
  nextTick(function () {
    scrollTop.value = 0
    uni.showToast({
      icon: 'none',
      title: '已返回顶部',
    })
  })
}
</script>

<template>
  <view class="notice-send">
    <view class="button-box">
      <view class="add-notice-btn btn">+ 新增公告</view>
      <view class="toTop btn" @click="goTop"><i class="iconfont icon-jiantou-copy"></i></view>
    </view>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"> </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.notice-send {
  width: 610rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 30rpx;
  .btn {
    text-align: center;
    transition: 0.2s ease;
    background-color: rgba(0, 0, 0, 0.2);
    font-weight: 550;
    &:active {
      scale: 0.95;
    }
  }

  .button-box {
    margin-top: 28rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rpx;
    .add-notice-btn {
      padding: 0 10rpx;
      width: 280rpx;
      height: 60rpx;
      line-height: 60rpx;
    }
    .toTop {
      padding: 10rpx;
      border-radius: 16rpx;
    }
  }
}
</style>
