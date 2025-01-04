<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { diliver_audit, diliver_auditResult } from '@/services/admin/delivery_manage'
/**
 * @description 管理端外卖员模块
 * @author 钟礼豪
 * @date 2024-10-31
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-31
 */

interface Info {
  id: number
  realName: string
  idCardNumber: string
}

const audits = ref<Info[]>()
const handleGetInfo = async () => {
  const res = await diliver_audit()
  console.log(res.data)
  audits.value = res.data
}
const handleAudit = async (flag: boolean, id: number) => {
  const res = await diliver_auditResult(flag, id)
  handleGetInfo()
}
onMounted(handleGetInfo)
</script>

<template>
  <scroll-view scroll-y="true" class="scroll-Y">
    <view v-for="audit in audits" :key="audit.id" class="audit-item">
      <view>姓名: {{ audit.realName }}</view>
      <view>编号: {{ audit.id }}</view>
      <view>身份信息: {{ audit.idCardNumber }}</view>
      <view class="btn">
        <button @click="handleAudit(true, audit.id)" class="approve-btn">通过</button>
        <button @click="handleAudit(false, audit.id)" class="reject-btn">不通过</button>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.scroll-Y {
  height: 70vh;
}
.audit-item {
  margin: 15rpx;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  background-color: $bg-color-light;
  view {
    font-size: 28rpx;
  }
  .btn {
    display: flex;
    margin: 0 auto;

    button {
      text-align: center;
      color: #000;
      font-size: 28rpx;
      margin-right: 40rpx;
      &:active {
        opacity: 0.8;
        transform: scale(0.95);
      }
    }
    .approve-btn {
      background-color: $bg-color-green;
      width: 100rpx;
      padding: 5rpx 10rpx;
      border-radius: 15%;
    }
    .reject-btn {
      width: 150rpx;
      padding: 5rpx 10rpx;
      border-radius: 15%;
      border: 1rpx solid $bg-color-dark;
      background-color: $bg-color-light;
    }
  }
}
</style>
