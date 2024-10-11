<template>
  <div class="icon" :style="iconStyle">
    {{ props.data }}
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

// 定义组件的props
const props = defineProps({
  data: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
})

// 计算样式
const iconStyle = computed(() => ({
  width: `${props.radius * 2}rpx`,
  height: `${props.radius * 2}rpx`,
  borderRadius: '50%',
  backgroundColor: 'red',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: `${props.radius * 1.4}rpx`, //调整字体大小
}))
</script>

<style scoped lang="scss">
.icon {
  font-family: 'Arial', sans-serif; /* 设置字体，确保数字清晰显示 */
}
</style>
