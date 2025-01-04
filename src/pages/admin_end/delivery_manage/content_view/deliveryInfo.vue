<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { diliver_info } from '@/services/admin/delivery_manage'
import type { DataItem } from '@/types/admin_return'

const notice_list = ref<DataItem[]>()
const handleGetInfo = async () => {
  const res = await diliver_info()
  console.log(res.data)
  notice_list.value = res.data
}
onMounted(handleGetInfo)

const changeShow = (index: number) => {
  notice_list.value[index].is_show = !notice_list.value[index].is_show
}
</script>

<template>
  <view class="wrapper">
    <scroll-view scroll-y="true" class="scroll-Y">
      <view class="info-box" v-for="(item, index) in notice_list" :key="index">
        <view class="info">
          <view class="logo">
            <image
              :src="!!item.imageUrl ? item.imageUrl : '/static/images/kssdt.png'"
              mode="aspectFill"
            ></image>
          </view>
          <view>
            <view class="info-item" style="font-size: 28rpx">{{ item.realName }}</view>
            <view class="info-item">电话: {{ item.phoneNumber }}</view>
          </view>
        </view>
        <view class="info-wrapper" :class="{ show: item.is_show }">
          <view class="content" v-if="item.is_show">
            <view class="info-item">近7天总配送费: {{ item.info.totalSalary }}</view>
            <view class="info-item">固定地点总配送单数: {{ item.info.totalOrders }}</view>
            <view class="info-item" v-for="(locationObj, index) in item.info.nums" :key="index">
              <span v-for="(value, location) in locationObj" :key="location">
                {{ location }}总配送单数: {{ value }}
              </span>
            </view>
          </view>
          <view @click="changeShow(index)" class="icon">
            <i class="iconfont icon-jiantouarrow483"></i>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.scroll-Y {
  height: 70vh;
}
.wrapper {
  width: 590rpx;
  max-height: 75vh;
}
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
      image {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        margin-right: 20rpx;
        background-color: #fff;
        overflow: hidden;
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
