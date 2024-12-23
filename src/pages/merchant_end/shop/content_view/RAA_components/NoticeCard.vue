<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
/**
 * @description 通知卡片
 * @author 应东林
 * @date 2024-12-12
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-22
 */

type NoticeType = {
  type: number //通知类型，系统公告1，管理员公告2
  content: string
  time: string
}
// 传递的数据
const props = defineProps<{
  NoticeInfo: NoticeType
}>()
const NoticeInfo = props.NoticeInfo
</script>

<template>
  <view class="card">
    <view class="x-wrapper">
      <up-avatar :src="'static/images/car.png'"></up-avatar>
      <view class="y-wrapper">
        <view class="x-wrapper">
          <view>{{ NoticeInfo.type === 1 ? '系统公告' : '管理员公告' }}</view>
          <view class="date">{{ NoticeInfo.time }}</view>
        </view>
        <view class="content">{{ NoticeInfo.content }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card {
  background: $bg-color-light;
  margin-bottom: 20rpx;
  font-size: 26rpx;
  padding: 20rpx;
  .up-avatar {
    flex: 1;
  }

  .content {
    width: 100%;
    white-space: wrap;
    margin-bottom: 20rpx;
  }

  .date {
    font-size: 18rpx;
    color: $text-color-green;
  }
}

.x-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20rpx;
}
.y-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
