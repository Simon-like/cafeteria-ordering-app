<script setup lang="ts">
import { ref } from 'vue'
/**
 * @description 管理端外卖员模块
 * @author 钟礼豪
 * @date 2024-10-31
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-10-31
 */

// 假设的数据，实际应用中可能从API获取
const audits = ref([
  {
    name: '张三',
    id: '001',
    identity: '361128',
  },
  {
    name: '李四',
    id: '002',
    identity: '361128',
  },
])

const approve = (index: number) => {
  console.log(`通过商家：${notice_list.value[index].name}`)
  // 这里可以添加审核通过的逻辑，例如发送请求到后端
}

const reject = (index: number) => {
  console.log(`不通过商家：${notice_list.value[index].name}`)
  // 这里可以添加审核不通过的逻辑，例如发送请求到后端
}
</script>

<template>
  <scroll-view scroll-y="true" class="scroll-Y">
    <view v-for="audit in audits" :key="audit.id" class="audit-item">
      <view>姓名: {{ audit.name }}</view>
      <view>编号: {{ audit.id }}</view>
      <view>身份信息: {{ audit.identity }}</view>
      <view class="btn">
        <button @click="approve(index)" class="approve-btn">通过</button>
        <button @click="reject(index)" class="reject-btn">不通过</button>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
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
