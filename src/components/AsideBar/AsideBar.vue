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
  addItem?: string
  style?: string
}>()
const emit = defineEmits(['switch', 'add'])
const channelSwitch = (id: number) => {
  props.itemList.forEach((value, index, arr) => {
    arr[index].active = false
    if (index === id) {
      arr[index].active = true
    }
  })
  emit('switch', id)
}
const addItem = () => {
  emit('add', true)
}
</script>

<template>
  <view class="aside-bar-default" :class="{ 'aside-bar-category': props.style === 'category' }">
    <view
      class="item"
      v-for="item in props.itemList"
      @click="channelSwitch(item.itemId)"
      :class="{ active: item.active }"
      :key="item.itemId"
    >
      <view class="title">
        {{ item.itemName }}
        <view v-if="!!item.addNumber && item.addNumber > 0" class="add-number">{{
          item.addNumber
        }}</view></view
      >
    </view>
    <view class="addItem" v-if="!!props.addItem" @click="addItem">
      {{ props.addItem }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.aside-bar-default {
  width: 140rpx;
  height: 100%;
  border-bottom: none;
  border-radius: 20rpx 20rpx 0 0;
  color: $text-color-gray;
  overflow: hidden;
  background: $bg-color-dark;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 115rpx;
    transition: all 0.3s ease;
    padding: 8rpx;
    position: relative;
    &.active {
      .title {
        color: #fff;
      }
    }
    &::after {
      content: '';
      position: absolute;
      width: 8rpx;
      height: 50%;
      background: #fff;
      right: 0;
      transform-origin: 50% 0%;
      transform: scaleX(0);
      transition: transform 0.3s ease-in-out;
    }

    &.active::after {
      transform-origin: 50% 100%;
      transform: scaleX(1);
    }

    .title {
      text-align: center;
      font-size: 25rpx;
      position: relative;
      transition: all 0.3s ease;
      .add-number {
        position: absolute;
        right: -20rpx;
        top: -20rpx;
        z-index: 99;
        width: 30rpx;
        height: 30rpx;
        font-size: 25rpx;
        text-align: center;
        line-height: 30rpx;
        background-color: rgba(248, 82, 0, 0.5);
        color: #fff;
        border-radius: 50%;
      }
    }
  }
  .addItem {
    font-size: 22rpx;
    height: 40rpx;
    line-height: 40rpx;
    margin: 20rpx 10rpx 10rpx 10rpx;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 16rpx;
    text-align: center;
    transition: 0.2s ease;
    &.active {
      scale: 0.95;
    }
  }
}

.aside-bar-category {
  background: transparent;
  color: #000;
  font-weight: 530;
  padding: 8rpx;
  .item {
    background: #bbefba;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    &::after,
    &.active::after {
      content: '';
      transform: scaleX(0);
    }
  }
  .addItem {
    color: $text-color-active;
    background: transparent;
  }
}
</style>
