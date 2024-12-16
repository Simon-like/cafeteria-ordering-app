<script setup lang="ts">
import { ref } from 'vue'

interface NoticeItem {
  picture: string
  name: string
  phone: string
  totalsalary: string
  totalorder: string
  A: string
  B: string
  C: string
  is_show: boolean
}

const notice_list = ref<NoticeItem[]>([
  {
    picture: 'http://',
    name: '张三',
    phone: '123456789',
    totalsalary: '1000',
    totalorder: '100',
    A: '40',
    B: '30',
    C: '30',
    is_show: false,
  },
  {
    picture: 'http://',
    name: '李四',
    phone: '987654321',
    totalsalary: '1500',
    totalorder: '150',
    A: '50',
    B: '40',
    C: '40',
    is_show: false,
  },
])

const changeShow = (index: number) => {
  notice_list.value[index].is_show = !notice_list.value[index].is_show
}
</script>

<template>
  <scroll-view scroll-y="true" class="scroll-Y">
    <view class="info-box" v-for="(item, index) in notice_list" :key="index">
      <view class="info">
        <view class="logo">
          <image :src="item.picture" mode="aspectFit"></image>
        </view>
        <view>
          <view class="info-item" style="font-size: 28rpx">{{ item.name }}</view>
          <view class="info-item">电话: {{ item.phone }}</view>
        </view>
      </view>
      <view class="info-wrapper" :class="{ show: item.is_show }">
        <view class="content" v-if="item.is_show">
          <view class="info-item">近7天总配送费: {{ item.totalsalary }}</view>
          <view class="info-item">固定地点总配送单数: {{ item.totalorder }}</view>
          <view class="info-item">地点A总配送单数: {{ item.A }}</view>
          <view class="info-item">地点B总配送单数: {{ item.B }}</view>
          <view class="info-item">地点C总配送单数: {{ item.C }}</view>
        </view>
        <view @click="changeShow(index)" class="icon">
          <i class="iconfont icon-jiantouarrow483"></i>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.info-box {
  font-size: 25rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  margin: 15rpx 15rpx 15rpx 15rpx;
  background-color: $bg-color-light;

  .info {
    display: flex;
    align-items: center;

    .logo {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      background-color: #fff;
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info-item {
      margin-top: 10rpx;
      margin-bottom: 10rpx;
    }
  }

  .info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0;

    .content {
      display: grid;
      grid-template-rows: 0fr;
      transition: all 0.3s ease-out;
      border-top: 1px solid transparent;

      .info-item {
        margin-left: 170rpx;
        margin-bottom: 10rpx;
        overflow: hidden;
      }

      .btn {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 20rpx;
        .approve-btn,
        .reject-btn {
          border: 2px solid black;
          padding: 10rpx;
          margin: 0 20rpx;
        }
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
        grid-template-rows: 1fr;
      }
    }
  }
}
</style>
