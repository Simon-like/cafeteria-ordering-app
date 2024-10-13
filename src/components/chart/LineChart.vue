<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
/**
 * @description 折线图组件
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

interface seriesData {
  name: string
  data: number[]
}

const props = defineProps<{
  categories: string[]
  series: seriesData[]
}>()

let chartData = ref({
  categories: props.categories,
  series: props.series,
})

//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
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
  padding: [15, 10, 0, 15],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true,
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 2,
  },
  extra: {
    line: {
      type: 'straight',
      width: 2,
      activeType: 'hollow',
    },
  },
})

watch(props, (newValue, oldValue) => {
  chartData.value = props
})
</script>

<template>
  <view class="charts-box">
    <qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
  </view>
</template>

<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
