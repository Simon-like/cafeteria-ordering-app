<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'
/**
 * @description 订单管理模块-头部栏
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-24
 */

//下拉时间选择逻辑实现
const date_PickerRef = ref()
const date_show = ref<boolean>(false)
let date_list: string[] = getLastDays(7).map((item, index) => (index === 0 ? '今日' : item))
const date_columns = reactive([date_list])
const date_value = ref<string>(date_columns[0][0]) //当前选中时间

const date_confirm = (e: any) => {
  const { columnIndex, value, values, index } = e
  date_show.value = false
  date_value.value = value[0]
}

//下拉订单类型选择逻辑实现
const oderType_PickerRef = ref()
const oderType_show = ref<boolean>(false)
const oderType_columns = reactive([
  [
    {
      label: '外卖单',
      id: 0,
    },
    {
      label: '堂食单',
      id: 1,
    },
  ],
])
const oderType_value = ref<string>(oderType_columns[0][0].label) //当前选中订单类型
const oderType_id = ref<number>(0) //对应ID

const oderType_confirm = (e: any) => {
  const { value, values, index } = e
  oderType_id.value = value[0].id
  oderType_value.value = value[0].label
  oderType_show.value = false
}
</script>

<template>
  <view class="header">
    <view class="date-picker" @click="date_show = true">
      {{ date_value }}<i class="iconfont icon-jiantou_xia"></i>
    </view>
    <view class="oderType-picker" @click="oderType_show = true">
      {{ oderType_value }}<i class="iconfont icon-jiantou_xia"></i>
    </view>
    <SearchBox />
  </view>
  <up-picker
    :show="date_show"
    :columns="date_columns"
    ref="date_PickerRef"
    @confirm="date_confirm"
    @cancel="date_show = false"
  ></up-picker>
  <up-picker
    :show="oderType_show"
    :columns="oderType_columns"
    keyName="label"
    ref="oderType_PickerRef"
    @confirm="oderType_confirm"
    @cancel="oderType_show = false"
  ></up-picker>
</template>

<style lang="scss" scope>
.header {
  width: 100%;
  font-size: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconfont {
    font-size: 20rpx;
    margin-left: 8rpx;
    color: $text-color-green;
  }
}
</style>
