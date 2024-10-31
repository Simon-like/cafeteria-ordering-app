<script lang="ts" setup>
import Header from '@/pages/merchant_end/shop/content_view/financialBills_components/Header.vue'
import OderItem from '@/pages/merchant_end/shop/content_view/financialBills_components/OderItem.vue'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLastDays } from '@/composables/tools'
/**
 * @description 店铺管理财务信息管理
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-31
 */

//下拉订单类型选择逻辑实现
const oderType_PickerRef = ref()
const oderType_show = ref<boolean>(false)
const oderType_columns = reactive([
  [
    {
      label: '全部',
      id: 0,
    },
    {
      label: '已支付',
      id: 1,
    },
    {
      label: '已退款',
      id: 2,
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
  <view class="financial-bills">
    <Header />
    <view class="main">
      <view class="line">
        <view>流水明细</view>
        <SearchBox />
        <view class="oderType-picker" @click="oderType_show = true">
          筛选：{{ oderType_value }}<i class="iconfont icon-jiantouarrow483"></i>
        </view>
      </view>
      <view class="content">
        <scroll-view scroll-y="true" class="scroll-Y">
          <OderItem v-for="item in 15" />
        </scroll-view>
      </view>
    </view>

    <up-picker
      :show="oderType_show"
      :columns="oderType_columns"
      keyName="label"
      ref="oderType_PickerRef"
      @confirm="oderType_confirm"
      @cancel="oderType_show = false"
    ></up-picker>
  </view>
</template>

<style lang="scss" scope>
.financial-bills {
  width: 610rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50rpx 20rpx;
  font-size: 30rpx;
  white-space: nowrap;
  .line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20rpx;
  }
  .main {
    width: 100%;
    border-top: 1px solid #000;
    padding: 16rpx 0;
    .content {
      margin-top: 30rpx;
      width: 100%;
      height: 55vh;
    }
  }
}
</style>
