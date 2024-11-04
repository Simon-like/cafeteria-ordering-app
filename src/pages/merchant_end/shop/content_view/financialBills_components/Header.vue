<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'
/**
 * @description 财务管理模块-头部栏
 * @author 应东林
 * @date 2024-10-27
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-01
 */

// 传递的数据
const props = defineProps<{
  totalPrice: number
  difference: number
}>()

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
      <view class="total-price">{{ props.totalPrice }}</view>
      <view class="difference"
        >与昨日的差值:<text>{{ props.difference }}</text
        ><i
          class="iconfont"
          :class="{
            'icon-arrdown': props.difference >= 0,
            'icon-long_arrow_down': props.difference < 0,
          }"
        ></i
      ></view>
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
  .difference {
    display: flex;
    align-items: center;
    font-size: 25rpx;
    i,
    text {
      font-weight: 550;
    }
    .iconfont {
      font-size: 20rpx;
    }
  }
}
</style>
