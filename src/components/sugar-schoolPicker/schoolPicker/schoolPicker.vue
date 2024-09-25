<script lang="ts" setup>
import { ref, watch } from 'vue'
import provinceData from './city-data/province.ts'
import cityData from './city-data/city.ts'
import schoolData from './school-data/schools.ts'
import type { PickItem } from './type/type'

const props = defineProps<{
  pickerValueDefault?: number[]
  themeColor?: string
  onlySchool?: boolean
}>()

const emit = defineEmits<{
  (e: 'onConfirm', value: { label: string; value: number[] }): void
  (e: 'onCancel'): void
}>()

const pickerValue = ref<number[]>(props.pickerValueDefault || [0, 0, 0])
const showPicker = ref(false)

const provinceDataList = ref<PickerItem[]>([{ label: '全国' }, ...provinceData])
const cityDataList = ref<PickerItem[]>([{ label: '所有' }, ...cityData[0]])
const areaDataList = ref<PickerItem[]>([])

watch(
  () => props.onlySchool,
  () => {
    updateCityData()
    updateAreaData()
  },
)

watch(pickerValue, () => {
  updateCityData()
  updateAreaData()
})

const updateCityData = () => {
  cityDataList.value = props.onlySchool
    ? cityData[pickerValue.value[0]]
    : [{ label: '所有' }, ...(cityData[pickerValue.value[0] - 1] || [])]
}

const updateAreaData = () => {
  areaDataList.value = [{ label: '所有' }, ...getSchoolData()]
}

const getSchoolData = (): PickerItem[] => {
  const province = provinceDataList.value[pickerValue.value[0]].label
  const city = cityDataList.value[pickerValue.value[1]].label
  return schoolData
    .filter((v) => v.province === province && v.city === city)
    .map((v) => ({ label: v.name }))
}

const getLabel = (): string => {
  return `${provinceDataList.value[pickerValue.value[0]].label}-${
    cityDataList.value[pickerValue.value[1]].label
  }-${areaDataList.value[pickerValue.value[2]].label}`
}

const show = () => {
  showPicker.value = true
}
const pickerCancel = () => {
  showPicker.value = false
  emit('onCancel')
}
const pickerConfirm = () => {
  showPicker.value = false
  emit('onConfirm', { label: getLabel(), value: pickerValue.value })
}
const pickerChange = (e: any) => {
  pickerValue.value = e.mp.detail.value
}
</script>
<template>
  <div class="mpvue-picker">
    <div :class="{ pickerMask: showPicker }" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content" :class="{ 'mpvue-picker-view-show': showPicker }">
      <div class="mpvue-picker__hd" catchtouchmove="true">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" :style="{ color: themeColor }" @click="pickerConfirm">
          确定
        </div>
      </div>
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
      >
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item, index) in provinceDataList" :key="index">
              {{ item.label }}
            </div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item, index) in cityDataList" :key="index">
              {{ item.label }}
            </div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item, index) in areaDataList" :key="index">
              {{ item.label }}
            </div>
          </picker-view-column>
        </block>
      </picker-view>
    </div>
  </div>
</template>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}

.mpvue-picker-view-show {
  transform: translateY(0);
}

.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}

.mpvue-picker__hd:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}

.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
}

.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}

.mpvue-picker__action:last-child {
  text-align: right;
}

.picker-item {
  text-align: center;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
}

.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
