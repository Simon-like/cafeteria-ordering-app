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

// 公告列表
const notice_list = ref<
  {
    targetGroup: number
    noticeContent: string
    releaseTime: string
    is_show: boolean
    index: number
  }[]
>([
  { targetGroup: 0, noticeContent: 'HHHHHH', releaseTime: '2024-10-24', is_show: false, index: 0 },
  { targetGroup: 0, noticeContent: 'HHHHHH', releaseTime: '2024-10-24', is_show: false, index: 1 },
  { targetGroup: 0, noticeContent: 'HHHHHH', releaseTime: '2024-10-24', is_show: false, index: 2 },
])

const onDescShow = (index: number) => {
  notice_list.value.forEach((item) => {
    if (item.index === index) item.is_show = !item.is_show
    else item.is_show = false
  })
}
</script>

<template>
  <view class="notice-send">
    <view class="button-box">
      <view class="add-notice-btn btn">+ 新增公告</view>
      <view class="toTop btn" @click="goTop"><i class="iconfont icon-jiantou-copy"></i></view>
    </view>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
      <view class="notice-box" v-for="item in notice_list" :key="item.index">
        <view class="notice-line">
          <view class="title">发布时间：</view>
          <view class="value">{{ item.releaseTime }}</view>
        </view>
        <view class="notice-line">
          <view class="title">面向对象：</view>
          <view class="value">{{ item.targetGroup === 1 ? '商家' : '外卖员' }}</view>
        </view>
        <view class="notice-line">
          <view class="title">公告内容：</view>
        </view>
        <view class="notice-content-wrapper" :class="{ show: item.is_show }">
          <view class="content">
            <view class="inner">
              <p>HHHHHHHHHHHHHHHHHHHH</p>
              <p>HHHHHHHHHHHHHHHHHHHH</p>
              <p>HHHHHHHHHHHHHHHHHHHH</p>
            </view>
          </view>
          <view @click="onDescShow(item.index)" class="icon">
            <i class="iconfont icon-jiantouarrow483"></i>
          </view>
        </view>
        <view class="delete btn">删除</view>
      </view>
    </scroll-view>
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
  padding: 30rpx 18rpx;
  gap: 30rpx;
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40rpx;
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

  .notice-box {
    width: 100%;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    margin-bottom: 20rpx;
    background-color: rgba(0, 0, 0, 0.2);
    .notice-line {
      display: flex;
      gap: 10rpx;
    }
    .notice-content-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20rpx;

      .content {
        display: grid;
        grid-template-rows: 0fr;
        transition: all 0.3s ease-out;
        border-top: 1px solid transparent;
        .inner {
          overflow: hidden;
        }
      }

      .icon {
        margin: 0 auto;
        text-align: center;
        transition: 0.3s ease-out;
      }

      &.show {
        .icon {
          transform: rotate(180deg);
        }

        .content {
          border-top: 1px solid #000;
          grid-template-rows: 1fr;
        }
      }
    }

    .delete {
      align-self: flex-end;
      margin-right: 20rpx;
      background: transparent;
    }
  }
}
</style>
