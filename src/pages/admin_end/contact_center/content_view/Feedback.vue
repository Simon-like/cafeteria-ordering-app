<script lang="ts" setup>
import { ref, nextTick } from 'vue'
/**
 * @description 管理端联络中心页面信息反馈模块
 * @author 应东林
 * @date 2024-10-26
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-10
 */

const targetGroup__Map = ['外卖员', '商家', '用户']

const res = ref([
  {
    phoneNumber: '16623819144',
    targetGroup: 0,
    realName: '应先生',
    avater: 'static/images/car.png',
    content:
      '哈哈哈哈哈哈酸辣粉了解的风口浪尖打开了就分开了撒饭发货时间地方喀什东路客服啊手机发快手了多久发哈',
    date: '09-10T15:23',
    is_show: false,
    index: 0,
  },
  {
    phoneNumber: '16623819144',
    targetGroup: 1,
    realName: '应先生',
    avater: 'static/images/car.png',
    content: '哈哈哈哈哈哈哈',
    date: '09-10T15:23',
    is_show: false,
    index: 1,
  },
  {
    phoneNumber: '16623819144',
    targetGroup: 2,
    realName: '应先生',
    avater: 'static/images/car.png',
    content: '哈哈哈哈哈哈哈',
    date: '09-10T15:23',
    is_show: false,
    index: 2,
  },
])
// 展开/关闭一个公告
const onDescShow = (index: number) => {
  res.value.forEach((item) => {
    if (item.index === index) item.is_show = !item.is_show
    else item.is_show = false
  })
}
</script>

<template>
  <view class="feedback">
    <view class="header">
      <SearchBox />
    </view>
    <!-- 信息列表 -->

    <view class="content">
      <scroll-view scroll-y="true" class="scroll-Y">
        <view class="feedback-item y-wrapper" v-for="item in res" :key="item.realName">
          <view class="info-section x-wrapper">
            <view class="left x-wrapper">
              <up-avatar :src="item.avater"></up-avatar>
              <view class="y-wrapper">
                <view class="realName">{{ item.realName }}</view>
                <view class="phoneNumber">联系电话:{{ item.phoneNumber }}</view>
              </view>
            </view>
            <view class="right y-wrapper">
              <view class="targetGroup">{{ targetGroup__Map[item.targetGroup] }}</view>
              <view class="date">{{ item.date }}</view>
            </view>
          </view>
          <!-- hidden:反馈内容 -->
          <view class="notice-content-wrapper" :class="{ show: item.is_show }">
            <view class="fn-content">
              <view class="inner">
                {{ item.content }}
              </view>
            </view>
          </view>
          <view @click="onDescShow(item.index)" class="icon" :class="{ show: item.is_show }">
            <i class="iconfont icon-jiantou_xia"></i>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.feedback {
  width: 590rpx;
  height: 100%;
  font-size: 26rpx;
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
  }
  .feedback-item {
    padding: 20rpx;
    gap: 20rpx;
    background: $bg-color-light;
    margin-bottom: 24rpx;
    .info-section {
      justify-content: space-between;
      .left {
        gap: 20rpx;
        .y-wrapper {
          gap: 20rpx;
          .realName {
            font-weight: 550;
          }
          .phoneNumber {
            font-size: 24rpx;
            white-space: nowrap;
          }
        }
      }

      .right {
        align-items: flex-end;
        gap: 20rpx;
        .targetGroup {
          color: $text-color-active;
        }
        .date {
          color: $bg-color-dark;
          font-size: 20rpx;
        }
      }
    }

    //反馈内容
    .notice-content-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20rpx;

      .fn-content {
        display: grid;
        grid-template-rows: 0fr;
        transition: all 0.3s ease-out;
        border-top: 1px solid transparent;
        padding: 20rpx;
        .inner {
          overflow: hidden;
          text-indent: 52rpx;
          white-space: wrap;
        }
      }

      &.show .fn-content {
        border-top: 1px solid $text-color-green;
        grid-template-rows: 1fr;
      }
    }

    .icon {
      width: 100%;
      text-align: center;
      transition: 0.3s ease-out;
      color: #b1caae;
      &.show {
        transform: rotate(180deg);
      }
    }
  }
}

.x-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.y-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
