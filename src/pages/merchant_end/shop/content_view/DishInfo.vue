<script lang="ts" setup>
import type { AsideItem } from '@/types/aside'
import { ref, reactive, nextTick } from 'vue'
import type { categoryData, dishData } from '@/types/merchant_return'
import {
  getDishByGroup,
  getAllCategory,
  addDish,
  addDishInCategory,
  getAll,
  downDish,
  getDishById,
  updateDishNot,
  updateDish,
  getAllCategoryNum,
  deleteCategory,
  addCategory,
  updateCategory,
} from '@/services/merchant/merchant_shop_dish_api'
import { onLoad, onReady } from '@dcloudio/uni-app'
/**
 * @description 店铺管理菜单信息管理
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-30
 */

// 菜品类型信息
type statusItem = {
  index: number
  title: string
  number: number
  active: boolean
}
const status_list = ref<statusItem[]>([
  { index: 0, title: '全部', number: 0, active: true },
  { index: 1, title: '热销', number: 0, active: false },
  { index: 2, title: '已下架', number: 0, active: false },
  { index: 3, title: '已售罄', number: 0, active: false },
  { index: 4, title: '折扣', number: 0, active: false },
  { index: 5, title: '单点不送', number: 0, active: false },
])
const statusSwitch = (index: number) => {
  status_list.value.forEach((item) => {
    if (index !== item.index) item.active = false
    else item.active = true
  })
}

//菜品信息

const dish_info_list = ref([
  { name: 'hh', index: 0, dishDesc_show: false },
  { name: 'hh', index: 1, dishDesc_show: false },
  { name: 'hh', index: 2, dishDesc_show: false },
  { name: 'hh', index: 3, dishDesc_show: false },
  { name: 'hh', index: 4, dishDesc_show: false },
  { name: 'hh', index: 5, dishDesc_show: false },
  { name: 'hh', index: 6, dishDesc_show: false },
  { name: 'hh', index: 7, dishDesc_show: false },
  { name: 'hh', index: 8, dishDesc_show: false },
  { name: 'hh', index: 9, dishDesc_show: false },
])

const specifications = ref<string[]>(['大分不辣', '小份辣', '加鸡腿', '加牛肚'])

// 加载数据
onLoad(() => {
  getAll()
})

const scrollTop = ref<number>(0)
const old = reactive({
  scrollTop: 0,
})

const scroll = (e: any) => {
  old.scrollTop = e.detail.scrollTop
}
const goTop = (e: any) => {
  // 解决view层不同步的问题
  scrollTop.value = old.scrollTop
  nextTick(function () {
    scrollTop.value = 0
  })
  uni.showToast({
    icon: 'none',
    title: '已返回顶部',
  })
}

const dishDesc_switch = (dishIndex: number) => {
  dish_info_list.value.forEach((item, index) => {
    if (index === dishIndex) {
      item.dishDesc_show = !item.dishDesc_show
    }
  })
}

//修改菜品信息
const edit = () => {
  uni.navigateTo({
    url: '/pages/merchant_end/shop/dish_info_edit/dish_info_edit',
    animationType: 'fade-in',
    animationDuration: 200,
  })
}

//新增菜品信息
const add = () => {
  uni.navigateTo({
    url: '/pages/merchant_end/shop/dish_info_add/dish_info_add',
    animationType: 'fade-in',
    animationDuration: 200,
  })
}

// 分组信息数据（后台给的）
const categoryData = ref<
  {
    categoryName: string
    categoryPriority: number
  }[]
>([])

const categoryRange = [
  { value: 0, text: '正常分组' },
  { value: 1, text: '推荐分组' },
  { value: 2, text: '火热分组' },
  { value: 3, text: '非常火热分组' },
]

// 分组用于侧边栏的数据
const category_list = ref<AsideItem[]>([
  { itemId: 0, itemName: '全部分组', active: true },
  { itemId: 1, itemName: '本店精品菜！！', active: false },
  { itemId: 2, itemName: '特色必点', active: false },
  { itemId: 3, itemName: '主食', active: false },
])
const channelId = ref<number>(0)
const onSwitch = (e: number) => {
  channelId.value = e
}

//新增分组
const popup = ref()

const onAddCategory = (e: boolean) => {
  popup.value.open('center')
}

const addCategoryLine = () => {
  categoryData.value.push({
    categoryName: '',
    categoryPriority: 0,
  })
}
</script>

<template>
  <view class="dish-info">
    <view class="status-header">
      <view
        class="status-box"
        v-for="item in status_list"
        :key="item.index"
        @click="statusSwitch(item.index)"
        :class="{ active: item.active }"
      >
        <view class="title">{{ item.title }}</view>
        <view class="number">{{ item.number }}</view>
      </view>
    </view>

    <view class="dish-body">
      <AsideBar
        :itemList="category_list"
        :addItem="'调整分组'"
        @switch="onSwitch"
        @add="onAddCategory"
      />
      <view class="dish-content">
        <view class="box">
          <view class="addDish-box" @click="add" v-if="category_list[0].active === true"
            >+ 新增菜品</view
          >
          <view class="addDish-box" @click="add" v-else>+ 在此分组下新增菜品</view>
          <view class="toTop" @click="goTop"><i class="iconfont icon-jiantou-copy"></i></view>
        </view>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
          <view class="dish-wrapper" v-for="value in dish_info_list">
            <view class="explicit-info">
              <view class="dish-img">{{ value.name }}</view>
              <view class="dish-info">
                <view class="dish-name">海参</view>
                <view class="dish-value-line">
                  <view class="today-inventory">今日库存(/份) 24</view>
                </view>
                <view class="dish-price-line">
                  <view class="current price"> <i class="iconfont icon-renminbi"></i>24.0 </view>
                  <view class="original price">
                    <i class="iconfont icon-renminbi"></i>40.0
                    <view class="underline"></view>
                    <view class="discount">6折</view>
                  </view>
                </view>
                <view class="dish-status-line">单点不送</view>
                <view class="button-box">
                  <view class="edit btn" @click="edit">修改信息</view>
                  <view class="discontinued btn">下架</view>
                </view>
              </view>
            </view>
            <view class="implicit-info" :class="{ active: value.dishDesc_show }">
              <view class="spec-line" v-for="(item, index) in specifications" :key="item">
                <view class="title">规格{{ index + 1 }}:</view>
                <view class="specItem">{{ item }}</view>
              </view>
            </view>
            <view class="Btn" @click="dishDesc_switch(value.index)">
              <i
                class="iconfont"
                :class="{
                  'icon-jiantouarrow483': !value.dishDesc_show,
                  'icon-jiantou-copy': value.dishDesc_show,
                }"
              ></i>
            </view>
          </view>
        </scroll-view>
      </view>

      <uni-popup ref="popup" type="dialog" border-radius="10px 10px 0 0">
        <uni-card class="form-card">
          <uni-section title="新增分组信息" type="line">
            <scroll-view scroll-y="true" class="scroll-Y">
              <view class="input-line" v-for="(line, index) in categoryData">
                <view class="label">分组{{ index + 1 }}：</view>
                <uni-easyinput v-model="line.categoryName" placeholder="请输入此分组名称" />
                <uni-data-select
                  v-model="line.categoryPriority"
                  :localdata="categoryRange"
                  placeholder="请选择此分组的重要程度"
                ></uni-data-select>
              </view>

              <view class="add-category-line" @click="addCategoryLine">添加一个分组</view>
            </scroll-view>
          </uni-section>
        </uni-card>
      </uni-popup>
    </view>
  </view>
</template>

<style lang="scss" scope>
.dish-info {
  width: 610rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30rpx;
  padding: 0;
  .status-header {
    width: 100%;
    height: 115rpx;
    border-bottom: 2px solid rgba(0, 0, 0, 0.8);
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    overflow-x: auto;

    .status-box {
      position: relative;
      display: flex;
      gap: 10rpx;
      padding: 8rpx;
      .title {
        white-space: nowrap;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -6rpx;
        width: 100%;
        height: 3rpx;
        background: #000;
        border-radius: 5rpx;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform 0.5s;
        font-size: 2em;
      }

      &.active::after {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
  .dish-body {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    .form-card {
      width: 700rpx;
      .scroll-Y {
        height: 500rpx;
      }
    }

    .dish-content {
      width: 470rpx;
      height: 1200rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8rpx;
      overflow: hidden;
      gap: 10rpx;

      .box {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .addDish-box {
          min-width: 210rpx;
          padding: 0 10rpx;
          height: 50rpx;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 16rpx;
          line-height: 50rpx;
          text-align: center;
          font-weight: 550;
          transition: 0.2s ease;
          &:active {
            scale: 0.95;
          }
        }
        .toTop {
          position: absolute;
          right: 10rpx;
          top: 0;
          padding: 10rpx;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 16rpx;
          font-weight: 550;
          transition: 0.2s ease;
          &:active {
            scale: 0.9;
          }
        }
      }
      .dish-wrapper {
        width: 100%;
        position: relative;
        background-color: rgba(0, 0, 0, 0.1);
        margin-bottom: 10rpx;
        padding: 0 5rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .explicit-info {
          width: 100%;
          padding: 18rpx 5rpx;
          height: 240rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20rpx;
          .dish-img {
            width: 150rpx;
            height: 150rpx;
            background-color: rgba(0, 0, 0, 0.2);
          }
          .dish-info {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6rpx;
            .dish-name {
              font-weight: 600;
            }
            .dish-value-line {
              font-size: 18rpx;
              display: flex;
              align-items: center;
            }
            .dish-price-line {
              display: flex;
              gap: 5rpx;
              align-items: bottom;
              .price {
                position: relative;
                font-size: 22rpx;
                .iconfont {
                  color: rgba(236, 154, 0, 0.9);
                  font-size: 20rpx;
                }
                &.original {
                  scale: 0.8;
                  .underline {
                    height: 0;
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    border-bottom: 1px solid rgb(0, 0, 0);
                  }
                  .discount {
                    position: absolute;
                    white-space: nowrap;
                    padding: 2rpx 4rpx;
                    background-color: rgba(0, 0, 0, 0.2);
                    left: 110%;
                    top: -80%;
                    border-radius: 8rpx;
                  }
                }
              }
            }

            .dish-status-line {
              font-size: 18rpx;
            }

            .button-box {
              display: flex;
              font-size: 20rpx;
              gap: 15rpx;
              align-self: flex-end;
              margin-right: 20rpx;
              .btn {
                padding: 8rpx 12rpx;
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 8rpx;
                font-weight: 550;
                transition: 0.2s ease;
                &:active {
                  scale: 0.9;
                }
              }
            }
          }
        }
        .implicit-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 40rpx;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          &.active {
            padding: 18rpx 15rpx;
            transition: all 0.5 ease;
            opacity: 1;
            max-height: 100vh;
            visibility: visible;
            border-top: 1px solid #000;
          }
          .spec-line {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            .specItem {
              border: 1px solid rgb(0, 0, 0);
              border-radius: 16rpx;
              padding: 5rpx;
              text-align: center;
            }
          }
        }
        .Btn {
          width: 100%;
          text-align: center;
          color: #000;
          font-size: 50rpx;
        }
      }
    }
  }
}
</style>
