<script lang="ts" setup>
import { useMerchantPagesStore, useMerchantOrderStore } from '@/stores'
import { ref, nextTick, watch } from 'vue'
/**
 * @description 商家端tabbar
 * @author 应东林
 * @date 2024-09-20
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-21
 */

// 本地订单数据
const OrderStore = useMerchantOrderStore()
// 商家端和管理端的tabbar动态切换

interface TabbarItem {
  index: number //tabbar选项排序位置，0开始
  text: string //tabbar选项名称
  pagePath: string //tabbar页面路径
  iconPath: string //未点击的图标
  selectedIconPath?: string //点击的图标
  dot?: boolean //圆点显示
  badge: number | null //右上角的角标提示信息
}

const tabbar_icon_list = [
  { default: '/static/tabs/home-default.png', selected: '/static/tabs/home-selected.png' },
  { default: '/static/tabs/shop-default.png', selected: '/static/tabs/shop-selected.png' },
  { default: '/static/tabs/order-default.png', selected: '/static/tabs/order-selected.png' },
  { default: '/static/tabs/user-default.png', selected: '/static/tabs/user-selected.png' },
]

// 商家端tabbar选项
const MerchantTabbarItem: TabbarItem[] = [
  {
    index: 0,
    text: '首页',
    pagePath: '/pages/merchant_end/index/index',
    iconPath: '/static/tabs/home-default.png',
    badge: null,
  },
  {
    index: 1,
    text: '店铺管理',
    pagePath: '/pages/merchant_end/shop/shop',
    iconPath: '/static/tabs/shop-default.png',
    badge: null,
  },
  {
    index: 2,
    text: '订单管理',
    pagePath: '/pages/merchant_end/order/order',
    iconPath: '/static/tabs/order-default.png',
    badge: -1,
  },
  {
    index: 3,
    text: '个人中心',
    pagePath: '/pages/merchant_end/my/my',
    iconPath: '/static/tabs/user-default.png',
    badge: null,
  },
]

const MerchantPages = useMerchantPagesStore()

const onChange = (id: number) => {
  MerchantPages.tabbarIndex = id
  MerchantTabbarItem.forEach((item, index) => {
    if (index === id) {
      item.iconPath = tabbar_icon_list[index].selected
    } else {
      item.iconPath = tabbar_icon_list[index].default
    }
  })
}

MerchantTabbarItem.forEach((item, index) => {
  if (index === MerchantPages.tabbarIndex) {
    item.iconPath = tabbar_icon_list[index].selected
  } else {
    item.iconPath = tabbar_icon_list[index].default
  }
})
const none_flag = ref<boolean>(false) //用于刷新这个组件的样式，否则红点数量无法及时更改
watch(OrderStore, (newValue, oldValue) => {
  let value = OrderStore.to_be_confirmed + OrderStore.confirmed
  MerchantTabbarItem[2].badge = value
  none_flag.value = !none_flag.value
})
</script>

<template>
  <up-tabbar
    :value="MerchantPages.tabbarIndex"
    @change="(id:number) => onChange(id)"
    :fixed="false"
    :placeholder="false"
    activeColor="#60cb5c"
    :safeAreaInsetBottom="false"
  >
    <up-tabbar-item
      v-for="item in MerchantTabbarItem"
      :text="item.text"
      :key="item.index"
      :icon="item.iconPath"
      :badge="item.badge"
      :style="{ none: none_flag }"
    >
    </up-tabbar-item>
  </up-tabbar>
</template>

<style lang="scss" scoped>
.none {
  border: none;
}
</style>
