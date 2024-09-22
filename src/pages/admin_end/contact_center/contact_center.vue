<script lang="ts" setup>
import { ref } from 'vue'
import { refreshToken } from '@/utils/refreshToken'

const show = ref(false)
</script>

<template>
  <view class="contact_center">
    <view
      class="testBtn"
      @click="
        refreshToken().then((res) => {
          console.log('hh:', res)
        })
      "
      >点我</view
    >
  </view>
</template>

<style lang="scss" scope>
.contact_center {
  width: 100%;
  height: 100%;
}
</style>
