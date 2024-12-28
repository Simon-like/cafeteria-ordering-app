<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMerchantAuditInfo, merchantAudit } from '@/services/admin/merchant_manage'
import type { MerchantAudit } from '@/types/admin_return'

/**
 * @description 管理端商户管理模块
 * @author 钟礼豪
 * @date 2024-10-27
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-31
 */

const notice_list = ref<MerchantAudit[]>()

// 获取商户审核信息
const handleGetInfo = async () => {
  const res = await getMerchantAuditInfo()
  notice_list.value = res.data
}
onMounted(handleGetInfo)

// 处理商户审核操作
const handleAudit = async (flag: boolean, id: number) => {
  const res = await merchantAudit(flag, id)
  handleGetInfo()
}

// 切换显示状态
const changeShow = (index: number) => {
  notice_list.value[index].is_show = !notice_list.value[index].is_show
  console.log(`Item ${index} is now ${notice_list.value[index].is_show ? 'shown' : 'hidden'}`)
}
</script>

<template>
  <scroll-view scroll-y="true" class="scroll-Y">
    <view class="info-box" v-for="(item, index) in notice_list" :key="item.id">
      <view class="info">
        <view class="logo">
          <image :src="item.logo" mode="aspectFit"></image>
        </view>
        <view>
          <view class="info-item"> 名称: {{ item.name }} </view>
          <view class="info-item"> 地址: {{ item.address }} </view>
          <view class="info-item"> 联系方式: {{ item.contactPhone }} </view>
        </view>
      </view>
      <view class="info-wrapper" :class="{ show: item.is_show }">
        <view class="content">
          <view class="info-item"> 营业时间: {{ item.businessHours }} </view>

          <view v-if="item.is_show">
            <view class="info-item"> 所有人: {{ item.realName }} </view>

            <view class="info-item"> 店铺简介: {{ item.discription }} </view>
          </view>
          <view class="btn">
            <button @click="handleAudit(true, item.id)" class="approve">通过</button>
            <button @click="handleAudit(false, item.id)" class="reject">不通过</button>
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
  background-color: $bg-color-light;

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
        .approve {
          background-color: $bg-color-green;
          width: 100rpx;
          padding: 5rpx 10rpx;
          border-radius: 15%;
        }
        .reject {
          width: 150rpx;
          padding: 5rpx 10rpx;
          border-radius: 15%;
          border: 1rpx solid $bg-color-dark;
          background-color: $bg-color-light;
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
