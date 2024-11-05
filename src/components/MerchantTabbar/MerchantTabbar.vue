<script lang="ts" setup>
import { useMerchantPagesStore } from '@/stores'
/**
 * @description 商家端tabbar
 * @author 应东林
 * @date 2024-09-20
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-21
 */

// 商家端和管理端的tabbar动态切换

interface TabbarItem {
  index: number //tabbar选项排序位置，0开始
  text: string //tabbar选项名称
  pagePath: string //tabbar页面路径
  iconPath: string //未点击的图标
  selectedIconPath: string //点击的图标
}

const tabbar_icon_list = [
  { default: '/static/tabs/home-default.png', selected: '/static/tabs/home-selected.png' },
  { default: '/static/tabs/shop-default.png', selected: '/static/tabs/shop-selected.png' },
  { default: '/static/tabs/order-default.png', selected: '/static/tabs/order-selected.png' },
  { default: '/static/tabs/user-default.png', selected: '/static/tabs/user-selected.png' },
]

// 商家端tabbar选项
const MerchantTabbarItem: Tabbartem[] = [
  {
    index: 0,
    text: '首页',
    pagePath: '/pages/merchant_end/index/index',
    iconPath: '/static/tabs/home-default.png',
  },
  {
    index: 1,
    text: '店铺管理',
    pagePath: '/pages/merchant_end/shop/shop',
    iconPath: '/static/tabs/shop-default.png',
  },
  {
    index: 2,
    text: '订单管理',
    pagePath: '/pages/merchant_end/order/order',
    iconPath: '/static/tabs/order-default.png',
  },
  {
    index: 3,
    text: '个人中心',
    pagePath: '/pages/merchant_end/my/my',
    iconPath: '/static/tabs/user-default.png',
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
</script>

<template>
  <up-tabbar
    :value="MerchantPages.tabbarIndex"
    @change="(id) => onChange(id)"
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
    >
    </up-tabbar-item>
  </up-tabbar>
</template>

<style lang="scss" scoped></style>
