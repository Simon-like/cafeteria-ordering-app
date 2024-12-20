<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'
import { useMerchantOrderStore } from '@/stores'
import { getOrdersByStatus, getOrdersByNumbers } from '@/services/merchant/merchant_shop_order_api'
/**
 * @description 订单管理模块-头部栏
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-27
 */

// 本地订单数据
const OrderStore = useMerchantOrderStore()

//订单数据加载
const getOrder_loading = async () => {
  const res = await getOrdersByStatus(
    OrderStore.oderType.value,
    OrderStore.status,
    OrderStore.date.value,
    0,
  )
  if (res.code === 1) {
    OrderStore.localOrderData = res.data.list
  } else {
    uni.showToast({
      icon: 'none',
      title: '刷新订单失败！',
    })
  }
}

//下拉时间选择逻辑实现
const date_PickerRef = ref()
const date_show = ref<boolean>(false)
let date_list: string[] = getLastDays(7) //具体日期数组
let date_value_list: string[] = date_list.map((item, index) => (index === 0 ? '今日' : item)) //有文字描述的日期数组
const date_columns = reactive([date_value_list])
const date_Index = ref<number>(0) //定位

const date_confirm = async (e: any) => {
  const { columnIndex, value, values, indexs } = e
  date_show.value = false
  OrderStore.date.label = value[0]
  OrderStore.date.value = date_list[indexs[0]]
  await getOrder_loading()
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

const oderType_confirm = async (e: any) => {
  const { value, values, index } = e
  OrderStore.oderType.label = value[0].label
  oderType_show.value = false
  OrderStore.oderType.value = value[0].id
  await getOrder_loading()
}

//订单号模糊查询
const onQuery = async (text: string) => {
  const res = await getOrdersByNumbers(text)
  if (res.code === 1) {
    if (res.data) {
      OrderStore.localOrderData = []
      OrderStore.localOrderData.push(res.data)
    } else {
      uni.showToast({
        icon: 'none',
        title: '不存在该订单，请检查输入！',
        duration: 2500,
      })
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: '查询订单失败！',
    })
  }
}
</script>

<template>
  <view class="header">
    <view class="flex-wrapper" v-show="!OrderStore.queryFlag">
      <view class="date-picker" @click="date_show = true">
        {{ OrderStore.date.label }}<i class="iconfont icon-jiantou_xia"></i>
      </view>
      <view class="oderType-picker" @click="oderType_show = true">
        {{ OrderStore.oderType.label }}<i class="iconfont icon-jiantou_xia"></i>
      </view>
    </view>
    <view class="flex-wrapper" v-show="OrderStore.queryFlag">
      <view>请输入订单编号：</view>
      <SearchBox @search="onQuery" />
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
    :show="oderType_show"
    :columns="oderType_columns"
    keyName="label"
    ref="oderType_PickerRef"
    @confirm="oderType_confirm"
    @cancel="oderType_show = false"
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
