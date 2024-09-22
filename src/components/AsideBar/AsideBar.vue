<script lang="ts" setup>
import type { AsideItem } from '@/types/aside'

/**
 * @description 侧边栏组件
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-17
 */

const props = defineProps<{
  itemList: AsideItem[]
}>()
const emit = defineEmits(['switch'])
const channelSwitch = (id: number) => {
  props.itemList.forEach((value, index, arr) => {
    arr[index].active = false
    if (index === id) {
      arr[index].active = true
    }
  })
  emit('switch', id)
}
</script>

<template>
  <view class="aside-bar">
    <view
      class="item"
      v-for="item in props.itemList"
      @click="channelSwitch(item.itemId)"
      :class="{ active: item.active }"
      :key="item.itemId"
    >
      {{ item.itemName }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.aside-bar {
  min-width: 150rpx;
  height: 100%;
  border-right: 2px solid rgba(3, 3, 3, 0.8);
  .item {
    width: 100%;
    min-height: 115rpx;
    border-bottom: 2px solid rgba(3, 3, 3, 0.8);
    transition: all 0.3s ease;
    font-size: 25rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8rpx;
    //text-align: center;
    //line-height: 115rpx;
    &.active {
      background-color: rgba(0, 225, 225, 0.8);
    }
  }
}
</style>
