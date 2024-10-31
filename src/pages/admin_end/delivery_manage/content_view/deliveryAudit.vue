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
        <button @click="approve(index)">通过</button>
        <button @click="reject(index)">不通过</button>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.audit-item {
  margin: 15rpx 15rpx 15rpx 15rpx;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  view {
    font-size: 25rpx;
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
</style>
