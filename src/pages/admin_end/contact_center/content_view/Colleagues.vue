<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import type { ColleagueItem } from '@/types/admin_return'
import { onLoad } from '@dcloudio/uni-app'
import { getColleagueInfo, queryColleagueInfo } from '@/services/admin/admin_api'
/**
 * @description 管理端联络中心页面管理员同事模块
 * @author 应东林
 * @date 2024-10-26
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-07
 */

// 同事信息列表
const colleague_res = ref<ColleagueItem[]>([])

// 加载管理员信息
const getColleagueInfo_loading = async () => {
  const res = await getColleagueInfo()
  if (res.code === 1) {
    colleague_res.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: '获取同事信息失败！',
    })
  }
}
const onSearch = async (realName: string) => {
  const res = await queryColleagueInfo(realName)
  if (res.code === 1) {
    colleague_res.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: '查询同事信息失败！',
    })
    getColleagueInfo_loading()
  }
}

// 数据加载
onLoad(async () => {
  await getColleagueInfo_loading()
})
</script>

<template>
  <view class="colleagues">
    <view class="header">
      <SearchBox :placeholder="'请输入查询姓名'" @search="onSearch" />
    </view>
    <view class="content">
      <scroll-view scroll-y="true" class="scroll-Y">
        <view class="colleague-item" v-for="item in colleague_res" :key="item.realName">
          <up-avatar :src="item.avater"></up-avatar>
          <view class="info-section">
            <view class="line">
              <view class="name" style="margin-right: 10rpx; font-size: 28rpx; font-weight: 550">{{
                item.realName
              }}</view>
              <view class="inviter" v-if="item.invitInfo">
                {{ item.invitInfo.inviteTime }}由{{ item.invitInfo.invitUserName }}邀请</view
              >
              <view class="inviter" v-else>开服管理员</view>
            </view>
            <view class="line">
              <view class="phone">电话:{{ item.phoneNumber }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.colleagues {
  width: 590rpx;
  height: 100%;
  font-size: 30rpx;
  padding: 30rpx 18rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30rpx;
    margin-bottom: 30rpx;
  }
  .content {
    width: 100%;
    height: 70vh;
    .colleague-item {
      width: 100%;
      background: $bg-color-light;
      padding: 20rpx;
      margin-bottom: 20rpx;
      display: flex;
      gap: 20rpx;
      align-items: center;
      justify-content: space-between;
      .info-section {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 20rpx;
        .line {
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 20rpx;
        }
      }
    }
  }
}
</style>
