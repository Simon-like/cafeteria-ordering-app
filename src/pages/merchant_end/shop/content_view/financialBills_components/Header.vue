<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'
import { getTotalAmountRollover } from '@/services/merchant/merchant_shop_order_api'
/**
 * @description 财务管理模块-头部栏
 * @author 应东林
 * @date 2024-10-27
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-11-01
 */

//下拉时间选择逻辑实现
const date_PickerRef = ref()
const date_show = ref<boolean>(false)
// 时间数组
const date_list: string[] = getLastDays(7)
// 时间标签数组
const date_list_label = ref<string[]>(date_list.map((item, index) => (index === 0 ? '今日' : item)))
const date_columns = reactive([date_list_label.value])
const date_index = ref(0) //时间定位

const emit = defineEmits(['date'])

//选择某日的流水
const date_confirm = async (e: any) => {
  date_show.value = false
  date_index.value = e.indexs[0]
  emit('date', date_list[date_index.value])
  await getAmount(date_list[date_index.value])
}

// 金额
const Amount = reactive({
  totalPrice: 114514.0,
  difference: 0.0,
})

// 每日金额流水
const getAmount = async (date: string) => {
  const res = await getTotalAmountRollover(date)
  if (res.code === 1) {
    Object.assign(Amount, res.data)
  } else {
    uni.showToast({
      icon: 'error',
      title: '获取流水信息失败！',
    })
  }
}

// 加载数据
onLoad(async () => {
  await getAmount(date_list[date_index.value])
  emit('date', date_list[date_index.value])
})
</script>

<template>
  <view class="header">
    <view class="line">
      <view class="date-picker" @click="date_show = true">
        {{ date_list_label[date_index] }}<i class="iconfont icon-jiantou_xia"></i>
      </view>
      <view class="">总金额流水(/￥):</view>
    </view>
    <view class="line">
      <view class="total-price">{{ Amount.totalPrice }}</view>
      <view class="difference"
        >与前一日的差值:<text>{{ Amount.difference }}</text
        ><i
          class="iconfont"
          :class="{
            'icon-arrdown': Amount.difference >= 0,
            'icon-long_arrow_down': Amount.difference < 0,
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
  background: $bg-color-light;
  padding: 20rpx;
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
  .date-picker {
    vertical-align: middle;
    .iconfont {
      font-size: 20rpx;
      color: $text-color-green;
    }
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
