<template>
  <view class="charts-box">
    <qiun-data-charts type="rose" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script lang="ts" setup>
/**
 * @description 饼图组件
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */
const opts = {
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
}

let res = {
  series: [
    {
      data: [
        { name: '一班', value: 50 },
        { name: '二班', value: 30 },
        { name: '三班', value: 20 },
        { name: '四班', value: 18 },
        { name: '五班', value: 8 },
      ],
    },
  ],
}
const chartData = JSON.parse(JSON.stringify(res))
</script>

<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
