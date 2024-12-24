<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'

/**
 * @description 公告通知模块-头部栏
 * @author 应东林
 * @date 2024-12-22
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-22
 */

const emit = defineEmits(['date', 'type'])

//下拉时间选择逻辑实现
const date_PickerRef = ref()
const date_show = ref<boolean>(false)
let date_list: string[] = getLastDays(7) //具体日期数组
let date_value_list: string[] = date_list.map((item, index) => (index === 0 ? '今日' : item)) //有文字描述的日期数组
const date_columns = reactive([date_value_list])
const date_Index = ref<number>(0) //定位

const date_confirm = async (e: any) => {
  const { columnIndex, value, values, indexs } = e
  date_Index.value = indexs[0]
  emit('date', date_list[date_Index.value])
  date_show.value = false
}

//下拉订单类型选择逻辑实现
const Type_PickerRef = ref()
const Type_show = ref<boolean>(false)
const Type_ID = ref<number>(0)
const Type_columns = reactive([
  [
    {
      label: '全部',
      id: 0,
    },
    {
      label: '系统公告',
      id: 1,
    },
    {
      label: '管理员公告',
      id: 2,
    },
  ],
])

const Type_confirm = async (e: any) => {
  const { value, values, indexs } = e
  Type_ID.value = value[0].id
  emit('type', Type_ID.value)
  Type_show.value = false
}
</script>

<template>
  <view class="header">
    <view class="flex-wrapper">
      <view class="date-picker" @click="date_show = true">
        {{ date_value_list[date_Index] }}<i class="iconfont icon-jiantou_xia"></i>
      </view>
      <view class="oderType-picker" @click="Type_show = true">
        {{ Type_columns[0][Type_ID].label }}<i class="iconfont icon-jiantou_xia"></i>
      </view>
    </view>
  </view>
  <up-picker
    :show="date_show"
    :columns="date_columns"
    ref="date_PickerRef"
    @confirm="date_confirm"
    @cancel="date_show = false"
  ></up-picker>
  <up-picker
    :show="Type_show"
    :columns="Type_columns"
    keyName="label"
    ref="Type_PickerRef"
    @confirm="Type_confirm"
    @cancel="Type_show = false"
  ></up-picker>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  font-size: 30rpx;
  padding: 0 20rpx;
  white-space: nowrap;
  .iconfont {
    font-size: 20rpx;
    margin-left: 8rpx;
    color: $text-color-green;
  }
  .flex-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
