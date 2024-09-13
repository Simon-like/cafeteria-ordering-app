<script lang="ts" setup>
import type { AsideItem } from '@/types/aside'
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
  width: 150rpx;
  height: 100%;
  border-right: 2px solid rgba(3, 3, 3, 0.8);
  .item {
    width: 100%;
    height: 115rpx;
    border-bottom: 2px solid rgba(3, 3, 3, 0.8);
    transition: all 0.3s ease;
    font-size: 25rpx;
    text-align: center;
    line-height: 115rpx;
    &.active {
      background-color: rgba(0, 225, 225, 0.8);
    }
  }
}
</style>
