<script lang="ts" setup>
defineProps({
  itemList: {
    type: Object,
    default() {
      return {
        itemId: 0,
        itemName: '默认名称',
        active: false,
        hrefUrl: '',
      }
    },
  },
})
const channelSwitch = (id: number) => {}
</script>

<template>
  <view class="aside-bar">
    <view
      class="item"
      :class="{ active: item.active }"
      v-for="item in itemList"
      @click="channelSwitch(item.itemId)"
      :key="item.itemId"
    >
      {{ item.itemName }}
    </view>
  </view>
</template>

<style lang="scss">
.aside-bar {
  width: 115rpx;
  border-right: 2px solid rgba(3, 3, 3, 0.8);
  .item {
    width: 100%;
    height: 115rpx;
    border-bottom: 2px solid rgba(3, 3, 3, 0.8);
    &.active {
      background-color: rgba(0, 225, 225, 0.8);
    }
  }
}
</style>
