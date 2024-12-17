<script lang="ts" setup>
import type { AsideItem } from '@/types/aside'
import { ref, reactive, nextTick } from 'vue'
import type { categoryType, dishData, specItem } from '@/types/merchant_return'
import { useMerchantShopStore } from '@/stores'
import {
  getDishByGroup,
  getAllCategory,
  addDishInCategory,
  getAll,
  downDish,
  getAllCategoryNum,
  deleteCategory,
  addCategory,
  updateCategory,
  deleteFromCategory,
  upDish,
} from '@/services/merchant/merchant_shop_dish_api'
import { onLoad, onReady } from '@dcloudio/uni-app'
/**
 * @description 店铺管理菜单信息管理
 * @author 应东林
 * @date 2024-09-17
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-02
 */

const MerchantShopStore = useMerchantShopStore()

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
const statusSwitch = async (index: number) => {
  status_list.value.forEach((item) => {
    if (index !== item.index) item.active = false
    else item.active = true
  })
  switch (index) {
    case 0:
      MerchantShopStore.dishStatus = 4
      MerchantShopStore.isDiscounted = 2
      MerchantShopStore.isDeliver = 2
      break
    case 1:
      MerchantShopStore.dishStatus = 0
      MerchantShopStore.isDiscounted = 2
      MerchantShopStore.isDeliver = 2
      break
    case 2:
      MerchantShopStore.dishStatus = 2
      MerchantShopStore.isDiscounted = 2
      MerchantShopStore.isDeliver = 2
      break
    case 3:
      MerchantShopStore.dishStatus = 1
      MerchantShopStore.isDiscounted = 2
      MerchantShopStore.isDeliver = 2
      break
    case 4:
      MerchantShopStore.dishStatus = 4
      MerchantShopStore.isDiscounted = 1
      MerchantShopStore.isDeliver = 2
      break
    case 5:
      MerchantShopStore.dishStatus = 4
      MerchantShopStore.isDiscounted = 2
      MerchantShopStore.isDeliver = 0
      break
  }
  await dish_byGroup_info_loading()
}
//菜品信息

const dish_info_list = ref<
  {
    id: number
    dishName: string
    dishDescription: string
    price: number
    discount: number
    discountedPrice: number
    imageUrl: string
    categoryList: categoryType[]
    dishStatus: number // 菜品的状态，热销0、缺货1、下架2，其他3
    isDiscounted: number // 是否打折。0表示不打折，1表示打折
    isDeliver: number // 单点是否配送。0表示单点不配送，1单点配送
    todayInventory: number
    specList: specItem[] // 规格S
    dishDesc_show: boolean
    index: number
  }[]
>([])

const all_dish_info_list = ref<dishData[]>([])

// 加载并渲染全部菜品信息
const dish_all_info_loading = async () => {
  const res = await getAll()
  if (+res.code === 1) {
    all_dish_info_list.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: '菜品信息获取失败',
    })
  }
}
// 按类型和分组加载并渲染菜品信息
const dish_byGroup_info_loading = async () => {
  const res = await getDishByGroup(
    MerchantShopStore.dishStatus,
    MerchantShopStore.categoryId,
    MerchantShopStore.isDiscounted,
    MerchantShopStore.isDeliver,
  )
  if (+res.code === 1) {
    dish_info_list.value = []
    res.data.forEach((item, index) => {
      dish_info_list.value.push({ ...item, dishDesc_show: false, index: index })
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '菜品信息获取失败',
    })
  }
  await all_categoryNum_loading()
}

// 加载并渲染各类型下的菜品数量
const all_categoryNum_loading = async () => {
  const resNum = await getAllCategoryNum()
  if (+resNum.code === 1) {
    status_list.value[0].number = resNum.data.all
    status_list.value[1].number = resNum.data.selling
    status_list.value[2].number = resNum.data.discontinued
    status_list.value[3].number = resNum.data.soldOut
    status_list.value[4].number = resNum.data.discount
    status_list.value[5].number = resNum.data.dineIn
  } else {
    uni.showToast({
      icon: 'none',
      title: '各类型菜品数量获取失败',
    })
  }
}

const scrollTop = ref<number>(0)

const goTop = (e: any) => {
  scrollTop.value = 1
  // 解决view层不同步的问题
  nextTick(function () {
    scrollTop.value = 0
    uni.showToast({
      icon: 'none',
      title: '已返回顶部',
    })
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
const edit = (id: number) => {
  uni.navigateTo({
    url: `/pages/merchant_end/shop/dish_info_edit/dish_info_edit?id=${id}`,
    animationType: 'fade-in',
    animationDuration: 200,
  })
}

//新增菜品
const add = () => {
  uni.navigateTo({
    url: '/pages/merchant_end/shop/dish_info_add/dish_info_add',
    animationType: 'fade-in',
    animationDuration: 200,
  })
}

// 下架菜品

const onDownDish = async (id: number) => {
  const res = await downDish(id)
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '菜品下架成功',
    })
    await dish_byGroup_info_loading()
  } else {
    uni.showToast({
      icon: 'none',
      title: '菜品下架失败',
    })
  }
}

// 分组信息数据（后台给的）
const categoryData = ref<categoryType[]>([])

const categoryRange = [
  { value: 0, text: '正常分组' },
  { value: 1, text: '推荐分组' },
  { value: 2, text: '火热分组' },
  { value: 3, text: '非常火热分组' },
]

// 分组用于侧边栏的数据
const category_list = ref<AsideItem[]>([{ itemId: 0, itemName: '全部分组', active: true }])

const onSwitch = async (e: number) => {
  const index = e - 1
  if (index === -1) {
    MerchantShopStore.categoryId = -1
  } else {
    MerchantShopStore.categoryId = categoryData.value[index].categoryId
  }

  await dish_byGroup_info_loading()
}

//调整分组信息
const categoryPopup = ref()

const onOpenCategory = (e: boolean) => {
  categoryLoading()
  addCategoryLine.value.categoryName = ''
  addCategoryLine.value.categoryPriority = 0
  categoryPopup.value.open('center')
}

// 新增分组信息的临时存储
const addCategoryLine = ref({
  categoryName: '',
  categoryPriority: 0,
})

// 请求并渲染分组信息
const categoryLoading = async () => {
  const res = await getAllCategory()
  if (+res.code === 1) {
    categoryData.value = res.data
    categoryData.value.sort((a, b) => b.categoryPriority - a.categoryPriority) // 按优先级降序排序
    category_list.value = [{ itemId: 0, itemName: '全部分组', active: true }]
    categoryData.value.forEach((item, index) => {
      category_list.value.push({ itemId: index + 1, itemName: item.categoryName, active: false })
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '分组信息获取失败',
    })
  }
}

// 修改分组
const onCategoryEdit = async (
  categoryId: number,
  categoryPriority: number = 0,
  categoryName: string,
) => {
  // 校验
  if (!categoryName) {
    uni.showToast({
      icon: 'none',
      title: '分组信息不可为空！',
    })
    return
  }
  const res = await updateCategory(categoryName, categoryPriority, categoryId)
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '分组信息修改成功',
    })
    await categoryLoading()
  } else {
    uni.showToast({
      icon: 'none',
      title: '分组信息修改失败',
    })
  }
}

// 新增一个分组
const onCategoryAdd = async (name: string, priority: number = 0) => {
  if (!name) {
    uni.showToast({
      icon: 'none',
      title: '分组信息不可为空！',
    })
    return
  }
  const res = await addCategory(name, priority)
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '成功增加一个分组',
    })
    await categoryLoading()
    addCategoryLine.value.categoryName = ''
    addCategoryLine.value.categoryPriority = 0
  } else {
    uni.showToast({
      icon: 'none',
      title: '新增分组失败',
    })
  }
}

// 删除一个分组
const onCategoryDelete = async (id: number, name: string) => {
  uni.showModal({
    title: '删除提示',
    content: `您确定要删除分组<${name}>吗?`,
    confirmText: '确认删除！',
    confirmColor: 'rgba(218, 0, 0, 0.1)',
    cancelText: '误触了',
    success: async function (res) {
      if (res.confirm) {
        const res = await deleteCategory(id)
        if (+res.code === 1) {
          uni.showToast({
            icon: 'none',
            title: '成功删除该分组',
          })
          await categoryLoading()
        } else {
          uni.showToast({
            icon: 'none',
            title: '删除分组失败',
          })
        }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

// 加载数据
onLoad(async () => {
  MerchantShopStore.initializeCategory()
  // 获取所有分组
  await categoryLoading()
  await dish_byGroup_info_loading()
})

// 将某菜品添加至某分组

const ADDallDishInfoPopup = ref()
const MINUSallDishInfoPopup = ref()
const dish_choose_list = ref<
  {
    id: number
    isChoose: boolean
    imageUrl: string
    dishName: string
  }[]
>([])

const addByCategory = async () => {
  await dish_all_info_loading()
  dish_choose_list.value = []
  all_dish_info_list.value.forEach((item) => {
    if (
      item.categoryList &&
      !item.categoryList.find((category) => category.categoryId === MerchantShopStore.categoryId)
    )
      dish_choose_list.value.push({
        id: item.id,
        isChoose: false,
        imageUrl: item.imageUrl,
        dishName: item.dishName,
      })
  })
  ADDallDishInfoPopup.value.open('center')
}

const minusByCategory = async () => {
  await dish_all_info_loading()
  dish_choose_list.value = []
  all_dish_info_list.value.forEach((item) => {
    if (
      item.categoryList &&
      item.categoryList.find((category) => category.categoryId === MerchantShopStore.categoryId)
    )
      dish_choose_list.value.push({
        id: item.id,
        isChoose: false,
        imageUrl: item.imageUrl,
        dishName: item.dishName,
      })
  })
  MINUSallDishInfoPopup.value.open('center')
}

const onDishByCategory = (index: number) => {
  dish_choose_list.value[index].isChoose = !dish_choose_list.value[index].isChoose
}

const onAddDishInCategory = async () => {
  let list: {
    id: number
    isChoose: boolean
  }[] = []
  dish_choose_list.value && (list = dish_choose_list.value.filter((item) => item.isChoose))

  if (list.length === 0) {
    uni.showToast({
      icon: 'none',
      title: '请至少选择一个菜品哦！',
    })
    return
  }
  const newList = list.map((item) => item.id)

  const res = await addDishInCategory(MerchantShopStore.categoryId, newList)
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '新增成功！',
    })
    await dish_byGroup_info_loading()
    ADDallDishInfoPopup.value.close()
  } else {
    uni.showToast({
      icon: 'none',
      title: '新增失败！',
    })
  }
}

const onMinusDishInCategory = async () => {
  let list: {
    id: number
    isChoose: boolean
  }[] = []
  dish_choose_list.value && (list = dish_choose_list.value.filter((item) => item.isChoose))

  if (list.length === 0) {
    uni.showToast({
      icon: 'none',
      title: '请至少选择一个菜品哦！',
    })
    return
  }
  const newList = list.map((item) => item.id)

  const res = await deleteFromCategory(MerchantShopStore.categoryId, newList)
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '删除成功！',
    })
    await dish_byGroup_info_loading()
    MINUSallDishInfoPopup.value.close()
  } else {
    uni.showToast({
      icon: 'none',
      title: '删除失败！',
    })
  }
}

//恢复接单,重新上架
const onUpDish = async (id: number) => {
  const res = await upDish(id)
  if (res.code === 1) {
    await dish_byGroup_info_loading()
    uni.showToast({
      icon: 'none',
      title: '菜品已经重新上架！',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '上架失败！',
    })
  }
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
        @add="onOpenCategory"
        :style="'category'"
      />
      <view class="dish-content">
        <view class="box">
          <view class="addDish-box" @click="add" v-show="category_list[0].active === true"
            >新增菜品(待审核)<i class="iconfont icon-jiahao"></i
          ></view>
          <view
            class="addDish-box"
            @click="addByCategory"
            v-show="category_list[0].active === false"
            >添加菜品<i class="iconfont icon-jiahao"></i
          ></view>
          <view
            class="addDish-box"
            @click="minusByCategory"
            v-show="category_list[0].active === false"
            >删除菜品<i class="iconfont icon-jianhao"></i
          ></view>
          <view class="toTop" @click="goTop"><i class="iconfont icon-jiantou-copy"></i></view>
        </view>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
          <view
            class="dish-wrapper"
            v-for="value in dish_info_list"
            :key="value.id"
            :class="{ down: value.dishStatus === 2 }"
          >
            <view class="explicit-info">
              <image :src="value.imageUrl" mode="aspectFill" class="dish-img"></image>
              <view class="dish-info">
                <view class="dish-name">{{ value.dishName }}</view>
                <view class="dish-value-line">
                  <view class="today-inventory"
                    >每日最高销售份数： <text>{{ value.todayInventory }}</text></view
                  >
                </view>

                <view v-show="value.isDiscounted === 1">
                  <view class="dish-price-line">
                    <view class="current price">
                      <i class="iconfont icon-renminbi"></i
                      >{{ (+value.discountedPrice).toFixed(2) }}
                    </view>
                    <view class="original price">
                      <i class="iconfont icon-renminbi"></i>{{ (+value.price).toFixed(2) }}
                      <view class="underline"></view>
                      <view class="discount">{{ value.discount * 10 }}折</view>
                    </view>
                  </view>
                </view>

                <view v-show="value.isDiscounted === 0">
                  <view class="dish-price-line">
                    <view class="current price">
                      <i class="iconfont icon-renminbi"></i>{{ value.price }}</view
                    >
                  </view>
                </view>

                <view class="dish-status-line">{{ value.isDeliver ? '可配送' : '单点不送' }}</view>
                <view class="button-box">
                  <view class="btn" v-show="value.dishStatus === 2" @click="onUpDish(value.id)"
                    >恢复接单</view
                  >
                </view>
              </view>
            </view>
            <view class="implicit-info" :class="{ active: value.dishDesc_show }">
              <view class="inner">
                <view class="spec-line" v-for="(item, index) in value.specList" :key="item">
                  <view class="title" style="display: flex; align-items: center">
                    <view>规格{{ index + 1 }}:</view>
                    <h4>{{ item.specTitle }}</h4>
                    <view style="margin-left: 20rpx" v-if="item.isEssential">
                      <i class="iconfont icon-dian"></i>必选
                    </view>
                  </view>
                  <view class="specItem-box">
                    <view
                      class="specItem"
                      v-for="option in item.specOptions"
                      :key="option.optionsName"
                    >
                      <text>{{ option.optionsName }}</text>
                      <view class="Options-price" v-if="!!option.price">
                        <i class="iconfont icon-renminbi"></i>{{ option.price }}</view
                      >
                    </view>
                  </view>
                </view>
                <view class="dish-description">
                  <view class="label">菜品描述：</view>
                  <view class="content">{{ value.dishDescription }}</view>
                </view>
                <view class="button-box">
                  <view
                    class="downDish btn"
                    @click="onDownDish(value.id)"
                    v-show="value.dishStatus !== 2"
                    >暂不接单</view
                  >
                  <view class="btn" v-show="value.dishStatus === 2">已被下架</view>
                  <view class="edit btn" @click="edit(value.id)">修改信息</view>
                </view>
              </view>
            </view>
            <view
              class="Btn"
              @click="dishDesc_switch(value.index)"
              :class="{
                show: value.dishDesc_show,
              }"
            >
              <i class="iconfont icon-jiantou_xia"></i>
            </view>
          </view>
        </scroll-view>
      </view>

      <uni-popup ref="categoryPopup" type="dialog" border-radius="10px 10px 0 0">
        <uni-card class="form-card">
          <scroll-view scroll-y="true" class="scroll-Y">
            <section>
              <h3>调整已有分组信息</h3>
              <view class="input-line" v-for="(line, index) in categoryData" :key="line">
                <view class="label">分组{{ index + 1 }}：</view>
                <view class="input-box">
                  <uni-easyinput v-model="line.categoryName" placeholder="请输入此分组名称" />
                  <uni-data-select
                    v-model="line.categoryPriority"
                    :localdata="categoryRange"
                    placeholder="请选择此分组的重要程度"
                  ></uni-data-select>
                </view>
                <view class="button-box">
                  <view
                    class="category-button edit"
                    @click="
                      onCategoryEdit(line.categoryId, line.categoryPriority, line.categoryName)
                    "
                  >
                    修改此分组
                  </view>
                  <view
                    class="category-button delete"
                    @click="onCategoryDelete(line.categoryId, line.categoryName)"
                  >
                    删除此分组
                  </view>
                </view>
              </view>
            </section>

            <section>
              <h3>新增分组</h3>
              <view class="input-line">
                <view class="label">新增一个分组：</view>
                <view class="input-box">
                  <uni-easyinput
                    v-model="addCategoryLine.categoryName"
                    placeholder="请输入此分组名称"
                  />
                  <uni-data-select
                    v-model="addCategoryLine.categoryPriority"
                    :localdata="categoryRange"
                    placeholder="请选择此分组的重要程度"
                    :placement="'top'"
                  ></uni-data-select>
                </view>
                <view class="button-box">
                  <view
                    class="category-button edit"
                    @click="
                      onCategoryAdd(addCategoryLine.categoryName, addCategoryLine.categoryPriority)
                    "
                  >
                    确认添加
                  </view>
                </view>
              </view>
            </section>
          </scroll-view>
        </uni-card>
      </uni-popup>

      <uni-popup ref="ADDallDishInfoPopup" type="dialog" border-radius="10px 10px 0 0">
        <uni-card class="form-card addDish-in-category">
          <scroll-view scroll-y="true" class="scroll-Y">
            <section>
              <h3>向该分组添加菜品</h3>
              <view class="dish-line" v-for="(value, index) in dish_choose_list" :key="value">
                <image :src="value.imageUrl" mode="aspectFill" class="dish-img"></image>
                <view class="label"
                  >菜品{{ index + 1 }}:<text class="dishName">{{ value.dishName }}</text></view
                >
                <checkbox
                  :checked="dish_choose_list[index].isChoose"
                  @click="onDishByCategory(index)"
                />
              </view>
              <view class="btn" @click="onAddDishInCategory">确认添加</view>
            </section>
          </scroll-view>
        </uni-card>
      </uni-popup>

      <uni-popup ref="MINUSallDishInfoPopup" type="dialog" border-radius="10px 10px 0 0">
        <uni-card class="form-card addDish-in-category">
          <scroll-view scroll-y="true" class="scroll-Y">
            <section>
              <h3>从该分组删除菜品</h3>
              <view class="dish-line" v-for="(value, index) in dish_choose_list" :key="value">
                <image :src="value.imageUrl" mode="aspectFill" class="dish-img"></image>
                <view class="label"
                  >菜品{{ index + 1 }}:<text class="dishName">{{ value.dishName }}</text></view
                >
                <checkbox
                  :checked="dish_choose_list[index].isChoose"
                  @click="onDishByCategory(index)"
                />
              </view>
              <view class="btn" @click="onMinusDishInCategory">确认删除</view>
            </section>
          </scroll-view>
        </uni-card>
      </uni-popup>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.dish-info {
  width: 585rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30rpx;
  padding: 0 0 0 5rpx;
  .status-header {
    width: 100%;
    height: 115rpx;
    padding: 0 80rpx 0 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    overflow-x: auto;
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%);

    .status-box {
      position: relative;
      display: flex;
      gap: 10rpx;
      padding: 8rpx;
      color: rgba(0, 0, 0, 0.5);
      transition: all 0.5s ease;
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
      &.active {
        color: #000;
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
      padding: 40rpx;
      border-radius: 10rpx;
      .scroll-Y {
        height: 1000rpx;
      }

      h3 {
        font-size: 30rpx;
        margin-bottom: 30rpx;
        color: $text-color-active;
      }

      :deep(.uni-stat__select) {
        background-color: $bg-color-light;
        border: 2rpx solid $text-color-green;
        border-radius: 10rpx;
        color: $text-color-active;
      }
      :deep(.uni-select__input-text) {
        color: $text-color-active;
      }

      :deep(.uni-easyinput__content) {
        background-color: $bg-color-light !important;
        border: 2rpx solid $text-color-green !important;
        border-radius: 10rpx;
        color: $text-color-active;
      }
      :deep(.uni-easyinput__placeholder-class) {
        color: $text-color-green;
      }

      .input-line {
        display: flex;
        flex-direction: column;
        gap: 10rpx;
        align-items: center;
        border-radius: 10rpx;
        padding: 10rpx;
        margin-bottom: 20rpx;
        background: $bg-color-light;

        .label {
          align-self: flex-start;
          font-size: 30rpx;
          color: $text-color-green;
        }
        .button-box {
          align-self: flex-end;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20rpx;
          .category-button {
            border-radius: 30rpx;
            color: #fff;
            text-align: center;
            padding: 5rpx 15rpx;
            transition: 0.2s ease;
            &:active {
              scale: 0.95;
            }

            &.edit {
              background-color: $bg-color-green;
              color: #000;
            }
            &.delete {
              background-color: $bg-color-orange;
            }
          }
        }
        .input-box {
          display: flex;
          gap: 50rpx;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .addDish-in-category {
      width: 620rpx;
      padding: 40rpx;
      border-radius: 10rpx;
      .scroll-Y {
        height: 800rpx;
      }
      .dish-line {
        display: flex;
        gap: 10rpx;
        align-items: center;
        background: $bg-color-light;
        border-radius: 10rpx;
        padding: 10rpx;
        margin-bottom: 20rpx;
        .dish-img {
          width: 120rpx;
          height: 120rpx;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10rpx;
        }
        .label {
          text {
            font-weight: 550;
          }
        }
      }

      .btn {
        width: 200rpx;
        padding: 16rpx;
        margin: 0 auto;
        margin-top: 25rpx;
        text-align: center;
        background: $bg-color-green;
        border-radius: 30rpx;
        font-weight: 550;
        transition: 0.2s ease;
        &:active {
          scale: 0.95;
        }
      }
    }

    // 菜单样式
    .dish-content {
      width: 470rpx;
      height: 1090rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8rpx;
      overflow: hidden;
      gap: 10rpx;

      .box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10rpx;
        .addDish-box {
          font-weight: 400;
          font-size: 24rpx;
          vertical-align: middle;
          color: $text-color-active;
          transition: 0.2s ease;
          &:active {
            scale: 0.95;
          }
          i {
            font-size: 24rpx;
            margin-left: 10rpx;
          }
        }
        .toTop {
          padding: 10rpx;
          background-color: rgba(169, 255, 168, 0.5);
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
        background: linear-gradient(135deg, #d2fed1 10%, #fff 60%);
        border-radius: 10rpx;
        margin-bottom: 10rpx;
        padding: 0 5rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.3s ease;
        .explicit-info {
          width: 100%;
          padding: 18rpx 5rpx;
          height: 240rpx;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20rpx;
          .dish-img {
            width: 174rpx;
            height: 174rpx;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 10rpx;
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
              vertical-align: middle;
              margin-bottom: 8rpx;
              text {
                font-weight: 550;
              }
            }
            .dish-price-line {
              display: flex;
              align-items: flex-end;
              gap: 6rpx;
              margin-bottom: 4rpx;
              .price {
                position: relative;
                font-size: 20rpx;
                font-weight: 550;
                .iconfont {
                  color: $bg-color-orange;
                  font-size: 24rpx;
                }
                &.original {
                  color: #a5a5a5;
                  vertical-align: middle;
                  font-size: 12rpx;
                  .iconfont {
                    color: #a5a5a5;
                    font-size: 14rpx;
                  }
                  .underline {
                    height: 0;
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    border-bottom: 1px solid #a5a5a5;
                  }
                  .discount {
                    font-size: 16rpx;
                    position: absolute;
                    white-space: nowrap;
                    padding: 2rpx 4rpx;
                    color: $bg-color-orange;
                    background-color: rgba(255, 80, 0, 0.2);
                    left: 110%;
                    top: -80%;
                    border-radius: 8rpx;
                  }
                }
              }
            }

            .dish-status-line {
              font-size: 18rpx;
              color: $bg-color-orange;
            }

            .button-box {
              display: flex;
              font-size: 24rpx;
              gap: 15rpx;
              align-self: flex-end;
              margin-right: 20rpx;
              .btn {
                padding: 8rpx 12rpx;
                background-color: $bg-color-green;
                border-radius: 20rpx;
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
          padding: 18rpx 15rpx;
          width: 100%;
          display: grid;
          grid-template-rows: 0fr;
          transition: all 0.3s ease-out;
          border-top: 1px solid transparent;
          .inner {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 40rpx;
            overflow: hidden;
          }

          &.active {
            border-top: 1px solid #000;
            grid-template-rows: 1fr;
          }
          .spec-line {
            display: flex;
            width: 100%;
            justify-content: space-between;
            border-bottom: 1px solid #000;
            padding-bottom: 20rpx;
            flex-direction: column;
            .specItem-box {
              display: flex;
              align-items: center;
              gap: 12rpx;
              flex-wrap: wrap;
              .specItem {
                border: 1px solid rgb(0, 0, 0);
                border-radius: 16rpx;
                padding: 5rpx;
                align-items: center;
                display: flex;
                font-size: 30rpx;
                gap: 10rpx;
                .Options-price {
                  text-align: center;
                  font-size: 25rpx;
                  .iconfont {
                    font-size: 20rpx;
                  }
                }
              }
            }
          }

          .button-box {
            width: 100%;

            display: flex;
            font-size: 30rpx;
            gap: 20rpx;
            .btn {
              flex: 1;
              padding: 12rpx;
              background-color: rgba(0, 0, 0, 0.2);
              border-radius: 20rpx;
              transition: 0.2s ease;
              text-align: center;
              &:active {
                scale: 0.9;
              }
              &.downDish {
                background: $bg-color-orange;
                color: #fff;
              }
              &.edit {
                background: rgba(169, 255, 168, 0.5);
              }
            }
          }
        }
        .Btn {
          width: 100%;
          text-align: center;
          font-size: 45rpx;
          transition: 0.3s ease-out;
          color: #b1caae;
          &.show {
            transform: rotate(180deg);
          }
        }
      }
      //下架菜品样式
      .down {
        background: linear-gradient(135deg, #dddddd 10%, #fff 60%);
        .explicit-info {
          .dish-img {
            opacity: 0.5;
          }
          .price .iconfont,
          .original .iconfont {
            color: #000 !important;
          }
          .discount {
            color: #000 !important;
            background-color: rgba(221, 221, 221, 0.2) !important;
          }
          .dish-status-line {
            color: #000 !important;
          }
        }
      }
    }
  }
}
</style>
