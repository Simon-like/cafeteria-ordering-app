<script lang="ts" setup>
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

// 商家端tabbar选项
const MerchantTabbarItem: Tabbartem[] = [
  {
    index: 0,
    text: '首页',
    pagePath: '/pages/merchant_end/index/index',
    iconPath: 'home',
  },
  {
    index: 1,
    text: '店铺管理',
    pagePath: '/pages/merchant_end/shop/shop',
    iconPath: 'bag',
  },
  {
    index: 2,
    text: '订单管理',
    pagePath: '/pages/merchant_end/order/order',
    iconPath: 'shopping-cart',
  },
  {
    index: 3,
    text: '个人中心',
    pagePath: '/pages/merchant_end/my/my',
    iconPath: 'account',
  },
]

const emit = defineEmits(['switch'])
const change = (index: number) => {
  emit('switch', index)
}

const pageIndex = ref<number>(0)
</script>

<template>
  <up-tabbar
    :value="pageIndex"
    @change="(name) => (pageIndex = name)"
    :fixed="false"
    :placeholder="false"
    activeColor="#d81e06"
    :safeAreaInsetBottom="false"
  >
    <up-tabbar-item
      v-for="item in MerchantTabbarItem"
      :text="item.text"
      :key="item.index"
      :icon="item.iconPath"
      @click="change(item.index)"
    >
    </up-tabbar-item>
  </up-tabbar>
</template>

<style lang="scss" scoped></style>
