<script lang="ts" setup>
import { ref, reactive } from 'vue'
/**
 * @description 搜索框组件
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-24
 */
const input_content = ref<string>('')
const onSearch = () => {}
</script>

<template>
  <view class="search-box">
    <input type="text" v-model="input_content" />
    <view class="icon" @click="onSearch">
      <i class="iconfont icon-sousuo"></i>
    </view>
  </view>
</template>

<style lang="scss" setup>
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  width: 230rpx;
  padding: 6rpx 10rpx;
  input {
    outline: none;
    background: transparent;
    text-align: start;
    height: 50rpx;
  }
  .icon {
    border-radius: 16rpx;
    background-color: #fff;
    padding: 8rpx;
    transition: 0.2s ease;
    &:active {
      scale: 0.95;
    }
  }
}
</style>
