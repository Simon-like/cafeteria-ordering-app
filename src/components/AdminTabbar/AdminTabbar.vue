<script lang="ts" setup>
import { useAdminPagesStore } from '@/stores'
/**
 * @description 管理端tabbar
 * @author 应东林
 * @date 2024-09-20
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-21
 */
const AdminPages = useAdminPagesStore()
// 商家端和管理端的tabbar动态切换

interface TabbarItem {
  index: number //tabbar选项排序位置，0开始
  text: string //tabbar选项名称
  pagePath: string //tabbar页面路径
  iconPath: string //未点击的图标
  selectedIconPath: string //点击的图标
}

// 管理端tabbar选项
const AdminTabbarItem: TabbarItem[] = [
  {
    index: 0,
    text: '首页',
    pagePath: '/pages/admin_end/index/index',
    iconPath: 'home',
  },
  {
    index: 1,
    text: '商户管理',
    pagePath: '/pages/admin_end/merchant_manage/merchant_manage',
    iconPath: 'bag',
  },
  {
    index: 2,
    text: '外卖员管理',
    pagePath: '/pages/admin_end/delivery_manage/delivery_manage',
    iconPath: 'shopping-cart',
  },
  {
    index: 3,
    text: '联络中心',
    pagePath: '/pages/admin_end/contact_center/contact_center',
    iconPath: 'account',
  },
]

const emit = defineEmits(['switch'])
const change = (index: number) => {
  emit('switch', index)
}
</script>

<template>
  <up-tabbar
    :value="AdminPages.tabbarIndex"
    @change="(id) => (AdminPages.tabbarIndex = id)"
    :fixed="false"
    :placeholder="false"
    activeColor="#d81e06"
    :safeAreaInsetBottom="false"
  >
    <up-tabbar-item
      v-for="item in AdminTabbarItem"
      :text="item.text"
      :key="item.index"
      :icon="item.iconPath"
      @click="change(item.index)"
    >
    </up-tabbar-item>
  </up-tabbar>
</template>

<style lang="scss" scoped></style>
