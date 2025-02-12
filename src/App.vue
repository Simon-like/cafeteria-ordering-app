<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useMerchantPagesStore } from '@/stores'
const MerchantPages = useMerchantPagesStore()
// 安卓后台保活
const linAlive = uni.requireNativePlugin('Lin-Alive')
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
  linAlive.stopAliveService((res) => {
    console.log('停止保活服务: ' + JSON.stringify(res))
  })
})
onHide(() => {
  console.log('App Hide')
  linAlive.startAliveService(
    {
      title: '保持后台运行',
      description: '持续获取后台数据',
      hideFromTaskList: false,
      sendStatusWhenScreenOn: true,
      sendStatusScreenOnTime: 2,
      enableWakeLock: true,
      wakeLockScreenTime: 1,
    },
    (res) => {
      console.log(res)
      console.log('啊，怎么回事', MerchantPages.ws)
    },
  )
  linAlive.checkNotificationPermission((res) => {
    console.log('检查通知权限是否开启: ' + JSON.stringify(res))
  })
  linAlive.runInBackground((res) => {
    console.log(res)
    console.log('应用去后台啦', MerchantPages.ws)
  })
  linAlive.ignoreBatteryOptimization((res) => {
    console.log('关闭电池优化', res)
  })
})
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-plus/index.scss';
// 字体图标
@import '@/styles/font/iconfont.scss';
// // 通用样式
// @import '@/styles/commen-style.scss';

view,
navigator,
input,
scroll-view {
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
