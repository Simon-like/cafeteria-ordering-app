<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'
/**
 * @description 财务管理模块-头部栏
 * @author 应东林
 * @date 2024-10-27
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-27
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
</script>

<template>
  <view class="header">
    <view class="line">
      <view class="date-picker" @click="date_show = true">
        {{ date_value }}<i class="iconfont icon-jiantouarrow483"></i>
      </view>
      <view class="">总金额流水(/￥):</view>
    </view>
    <view class="line">
      <view class="total-price">577.31</view>
    </view>

    <up-picker
      :show="date_show"
      :columns="date_columns"
      ref="date_PickerRef"
      @confirm="date_confirm"
      @cancel="date_show = false"
    ></up-picker>
  </view>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  font-size: 30rpx;
  flex-direction: column;
  gap: 50rpx;
  .line {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20rpx;
  }
  .total-price {
    font-size: 45rpx;
    font-weight: 550;
  }
}
</style>
