<script lang="ts" setup>
import { ref, reactive } from 'vue'
/**
 * @description 搜索框组件
 * @author 应东林
 * @date 2024-10-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-24
 */
const props = defineProps<{
  placeholder?: string
}>()

const emit = defineEmits(['search'])

const input_content = ref<string>('')
const onSearch = () => {
  emit('search', input_content.value)
}
</script>

<template>
  <view class="search-box">
    <input
      type="text"
      v-model="input_content"
      :placeholder="props.placeholder"
      @confirm="onSearch"
    />
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
  border: 1px solid #b1caae;
  border-radius: 20rpx;
  background: #fff;
  max-width: 300rpx;
  transition: 0.2s ease;
  padding: 6rpx 10rpx;
  input {
    outline: none;
    background: transparent;
    text-align: start;
    height: 50rpx;
    font-size: 26rpx;
    &::placeholder {
      font-size: 20rpx;
    }
  }
  &:focus-within {
    border: 1px solid $bg-color-dark; /* 当子元素获得焦点时，外层盒子的边框样式 */
  }
  .icon {
    border-radius: 16rpx;
    color: #b1caae;
    padding: 8rpx;
    transition: 0.2s ease;
    &:active {
      scale: 0.95;
    }
  }
}
</style>
