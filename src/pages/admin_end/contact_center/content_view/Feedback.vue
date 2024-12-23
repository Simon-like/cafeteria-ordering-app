<script lang="ts" setup>
import { ref, nextTick, reactive } from 'vue'
import type { feedbackType } from '@/types/admin_return'
import { getFeedbackInfo } from '@/services/admin/admin_api'
import { onLoad } from '@dcloudio/uni-app'

/**
 * @description 管理端联络中心页面信息反馈模块
 * @author 应东林
 * @date 2024-10-26
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-10
 */

const targetGroup__Map = ['外卖员', '商家', '用户', '全部']
const feedback_list = ref<
  {
    avater: string
    nikename: string
    content: string
    date: string
    targetGroup: number //反馈人所在群体，0外卖员,1商家,2用户,3全部
    phoneNumber: string
    is_show: boolean
    index: number
  }[]
>([]) //反馈数据
const content = ref<string>('') //查询内容
const targetGroup = ref<number>(3) //查询群体
// 展开/关闭一个公告
const onDescShow = (index: number) => {
  feedback_list.value.forEach((item) => {
    if (item.index === index) item.is_show = !item.is_show
  })
}

//获取反馈数据
const getFeedackInfo_loading = async () => {
  feedback_list.value = []
  const res = await getFeedbackInfo(targetGroup.value, content.value)
  if (res.code === 1) {
    res.data.forEach((item, index, arr) => {
      feedback_list.value.push({
        ...item,
        is_show: false,
        index,
      })
    })
  } else {
    uni.showToast({
      icon: 'error',
      title: '获取信息失败！',
    })
  }
}

// 按名称模糊查询
const onQuery = async (e: string) => {
  targetGroup.value = 3
  content.value = e
  await getFeedackInfo_loading()
}

const targetGroup_show = ref<boolean>(false)
const targetGroup_PickerRef = ref()
const targetGroup_columns = reactive([
  [
    {
      label: '全部',
      id: 3,
    },
    {
      label: '外卖员',
      id: 0,
    },
    {
      label: '商家',
      id: 1,
    },
    {
      label: '用户',
      id: 2,
    },
  ],
])

const targetGroup_confirm = async (e: any) => {
  const { value, values, index } = e
  targetGroup.value = value[0].id
  targetGroup_show.value = false
  await getFeedackInfo_loading()
}

//时间转换器
function formatDate(inputDate: string) {
  // 创建一个 Date 对象
  const date = new Date(inputDate)

  // 提取月份、日期和时间
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth 返回的是 0-11，所以加 1
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // 返回格式化后的字符串
  return `${month}-${day}  ${hours}:${minutes}`
}

onLoad(async () => {
  await getFeedackInfo_loading()
})
</script>

<template>
  <view class="feedback">
    <view class="header">
      <view class="type-picker" @click="targetGroup_show = true">
        {{ targetGroup__Map[targetGroup] }}<i class="iconfont icon-jiantou_xia"></i>
      </view>
      <SearchBox :placeholder="'待查询人昵称'" @search="onQuery" />
    </view>
    <!-- 信息列表 -->

    <view class="content">
      <scroll-view scroll-y="true" class="scroll-Y">
        <view class="null-content" v-show="feedback_list.length === 0">没有信息反馈</view>
        <view class="feedback-item y-wrapper" v-for="item in feedback_list" :key="item.nikename">
          <view class="info-section x-wrapper">
            <view class="left x-wrapper">
              <up-avatar :src="item.avater"></up-avatar>
              <view class="y-wrapper">
                <view class="realName">{{ item.nikename }}</view>
                <view class="phoneNumber">联系电话:{{ item.phoneNumber }}</view>
              </view>
            </view>
            <view class="right y-wrapper">
              <view class="targetGroup">{{ targetGroup__Map[item.targetGroup] }}</view>
              <view class="date">{{ formatDate(item.date) }}</view>
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

    <!-- 用户群体选择框 -->
    <up-picker
      :show="targetGroup_show"
      :columns="targetGroup_columns"
      keyName="label"
      ref="targetGroup_PickerRef"
      @confirm="targetGroup_confirm"
      @cancel="targetGroup_show = false"
    ></up-picker>
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
    justify-content: space-between;
    padding-right: 30rpx;
    margin-bottom: 30rpx;
    .iconfont {
      font-size: 20rpx;
      margin-left: 8rpx;
      color: $text-color-green;
    }
  }
  .content {
    width: 100%;
    height: 70vh;
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
          color: $text-color-green;
          font-size: 22rpx;
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
