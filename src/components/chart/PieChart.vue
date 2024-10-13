<template>
  <view class="charts-box">
    <qiun-data-charts type="rose" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
/**
 * @description 饼图组件
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

const props = defineProps<{
  data: {
    name: string
    value: number
  }[]
}>()

let chartData = ref({
  series: [
    {
      data: props.data,
    },
  ],
})

const opts = ref({
  color: [
    '#1890FF',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc',
  ],
  padding: [5, 5, 5, 5],
  enableScroll: false,
  legend: {
    show: true,
    position: 'left',
    lineHeight: 25,
  },
  extra: {
    rose: {
      type: 'radius',
      minRadius: 50,
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 2,
      borderColor: '#FFFFFF',
      linearType: 'custom',
    },
  },
})

watch(props, (newValue, oldValue) => {
  chartData.value = {
    series: [
      {
        data: props.data,
      },
    ],
  }
})
</script>

<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
