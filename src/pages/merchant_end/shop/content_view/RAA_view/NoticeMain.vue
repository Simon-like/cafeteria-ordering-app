<script lang="ts" setup>
import NoticeCard from '@/pages/merchant_end/shop/content_view/RAA_components/NoticeCard.vue'
import NoticeHeader from '@/pages/merchant_end/shop/content_view/RAA_components/NoticeHeader.vue'
import { getNoticeByTimeAndType } from '@/services/merchant/merchant_api'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import type { ReviewsType } from '@/types/merchant_return'
import { ref, nextTick } from 'vue'
import { getLastDays } from '@/composables/tools'
/**
 * @description 店铺管理通知模块
 * @author 应东林
 * @date 2024-12-22
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-22
 */

type NoticeType = {
  type: number //通知类型，系统公告1，管理员公告2
  content: string
  time: string
}

const NoticeData = ref<NoticeType[]>([])
const date = ref<string>(getLastDays(1)[0])
const type = ref<number>(0)

const getNotice_loading = async () => {
  const res = await getNoticeByTimeAndType(date.value, type.value)
  if (res.code === 1) {
    NoticeData.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: '获取通知消息失败！',
    })
  }
}

const onDate = async (e: string) => {
  date.value = e
  await getNotice_loading()
}

const onType = async (e: number) => {
  type.value = e
  await getNotice_loading()
}

onLoad(async () => {
  await getNotice_loading()
})
</script>

<template>
  <view class="NoticeMain">
    <NoticeHeader @date="onDate" @type="onType" />
    <view class="content">
      <scroll-view scroll-y="true" class="scroll-Y">
        <view class="null-content" v-show="NoticeData.length === 0">暂时没有通知消息</view>
        <NoticeCard v-for="item in NoticeData" :NoticeInfo="item" />
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scope>
.NoticeMain {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .content {
    margin-top: 20rpx;
    width: 100%;
    height: 55vh;
    position: relative;
    .null-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      font-size: 36rpx;
      font-weight: 600;
    }
  }
}
</style>
