<script setup lang="ts">
import { ref, defineComponent } from 'vue'
/**
 * @description 管理端商户管理模块
 * @author 钟礼豪
 * @date 2024-10-27
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-31
 */
interface NoticeItem {
  index: number
  is_show: boolean
  name: string
  address: string
  contact: string
  business_hours: string
  owner: string
  shop_introduction: string
}

const notice_list = ref<NoticeItem[]>([
  {
    index: 0,
    is_show: false,
    name: '商家A',
    address: '地址A',
    contact: '联系方式A',
    business_hours: '营业时间A',
    owner: '所有人A',
    shop_introduction: '店铺简介A',
  },
  {
    index: 1,
    is_show: false,
    name: '商家B',
    address: '地址B',
    contact: '联系方式B',
    business_hours: '营业时间B',
    owner: '所有人B',
    shop_introduction: '店铺简介B',
  },
  // 更多商家数据...
])

const approve = (index: number) => {
  console.log(`通过商家：${notice_list.value[index].name}`)
  // 这里可以添加审核通过的逻辑，例如发送请求到后端
}

const reject = (index: number) => {
  console.log(`不通过商家：${notice_list.value[index].name}`)
  // 这里可以添加审核不通过的逻辑，例如发送请求到后端
}

const changeShow = (index: number) => {
  // 切换整个内容的显示状态
  notice_list.value[index].is_show = !notice_list.value[index].is_show
  console.log(`Item ${index} is now ${notice_list.value[index].is_show ? 'shown' : 'hidden'}`)
}
</script>

<template>
  <scroll-view scroll-y="true" class="scroll-Y">
    <view class="info-box" v-for="(item, index) in notice_list" :key="item.index">
      <view class="info">
        <view class="logo">
          <image src="" mode="aspectFit"></image>
        </view>
        <view>
          <view class="info-item"> 名称: {{ item.name }} </view>
          <view class="info-item"> 地址: {{ item.address }} </view>
          <view class="info-item"> 联系方式: {{ item.contact }} </view>
        </view>
      </view>
      <view class="info-wrapper" :class="{ show: item.is_show }">
        <view class="content">
          <view class="info-item"> 营业时间: {{ item.business_hours }} </view>
          <view v-if="item.is_show">
            <view class="info-item"> 所有人: {{ item.owner }} </view>
            <view class="info-item"> 店铺简介: {{ item.shop_introduction }} </view>
          </view>
          <view class="btn">
            <button @click="approve(index)">通过</button>
            <button @click="reject(index)">不通过</button>
          </view>
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
  width: 590rpx;
  font-size: 25rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  margin: 15rpx 15rpx 15rpx 15rpx;
  background-color: rgba(0, 0, 0, 0.2);

  .info {
    display: flex; // 使信息区域为水平排列
    align-items: center; // 垂直居中对齐

    .logo {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      margin-right: 20rpx; // logo与文本之间的间距
      background-color: #fff;
      image {
        width: 100%; // 确保图片填满logo区域
        height: 100%; // 确保图片填满logo区域
        object-fit: cover; // 保持比例
      }
    }

    .info-item {
      margin-top: 10rpx;
      margin-bottom: 10rpx; // 每项之间的间距
    }
  }

  .info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0;
    gap: 20rpx;

    .content {
      display: grid;
      grid-template-rows: 0fr;
      transition: all 0.3s ease-out;
      border-top: 1px solid transparent;

      .info-item {
        margin-left: 170rpx;
        margin-bottom: 10rpx; // 每项之间的间距
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
