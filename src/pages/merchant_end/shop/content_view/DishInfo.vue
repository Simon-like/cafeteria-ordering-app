<script lang="ts" setup>
import type { AsideItem } from '@/types/aside'
import { ref, reactive, nextTick } from 'vue'
import type { categoryType, dishData } from '@/types/merchant_return'
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
    specifications: string[] // 规格S
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
      />
      <view class="dish-content">
        <view class="box">
          <view class="addDish-box" @click="add" v-show="category_list[0].active === true"
            >+ 新增菜品(需要审核)</view
          >
          <view
            class="addDish-box"
            @click="addByCategory"
            v-show="category_list[0].active === false"
            >+ 新增菜品</view
          >
          <view
            class="addDish-box"
            @click="minusByCategory"
            v-show="category_list[0].active === false"
            >- 删除菜品</view
          >
          <view class="toTop" @click="goTop"><i class="iconfont icon-jiantou-copy"></i></view>
        </view>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
          <view class="dish-wrapper" v-for="value in dish_info_list" :key="value.dishName">
            <view class="explicit-info">
              <image :src="value.imageUrl" mode="aspectFill" class="dish-img"></image>
              <view class="dish-info">
                <view class="dish-name">{{ value.dishName }}</view>
                <view class="dish-value-line">
                  <view class="today-inventory">今日库存(/份) {{ value.todayInventory }}</view>
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
                  <view class="edit btn" @click="edit(value.id)">修改信息</view>
                  <view
                    class="discontinued btn"
                    @click="onDownDish(value.id)"
                    v-show="value.dishStatus !== 2"
                    >下架</view
                  >
                  <view class="discontinued btn" v-show="value.dishStatus === 2">已被下架</view>
                </view>
              </view>
            </view>
            <view class="implicit-info" :class="{ active: value.dishDesc_show }">
              <view class="inner">
                <view class="spec-line" v-for="(item, index) in value.specifications" :key="item">
                  <view class="title">规格{{ index + 1 }}:</view>
                  <view class="specItem">{{ item }}</view>
                </view>
                <view class="dish-description">
                  <view class="label">菜品描述：</view>
                  <view class="content">{{ value.dishDescription }}</view>
                </view>
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

      <uni-popup ref="categoryPopup" type="dialog" border-radius="10px 10px 0 0">
        <uni-card class="form-card">
          <scroll-view scroll-y="true" class="scroll-Y">
            <uni-section title="调整已有分组信息" type="line">
              <view
                class="input-line"
                v-for="(line, index) in categoryData"
                :key="line.categoryName"
              >
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
            </uni-section>

            <uni-section title="新增分组" type="line">
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
                <view
                  class="add-category-line"
                  @click="
                    onCategoryAdd(addCategoryLine.categoryName, addCategoryLine.categoryPriority)
                  "
                >
                  添加一个分组
                </view>
              </view>
            </uni-section>
          </scroll-view>
        </uni-card>
      </uni-popup>

      <uni-popup ref="ADDallDishInfoPopup" type="dialog" border-radius="10px 10px 0 0">
        <uni-card class="form-card addDish-in-category">
          <scroll-view scroll-y="true" class="scroll-Y">
            <uni-section title="向该分组添加菜品" type="line">
              <view
                class="dish-line"
                v-for="(value, index) in dish_choose_list"
                :key="value.dishName"
              >
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
            </uni-section>
          </scroll-view>
        </uni-card>
      </uni-popup>

      <uni-popup ref="MINUSallDishInfoPopup" type="dialog" border-radius="10px 10px 0 0">
        <uni-card class="form-card addDish-in-category">
          <scroll-view scroll-y="true" class="scroll-Y">
            <uni-section title="从该分组删除菜品" type="line">
              <view
                class="dish-line"
                v-for="(value, index) in dish_choose_list"
                :key="value.dishName"
              >
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
            </uni-section>
          </scroll-view>
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
        height: 1000rpx;
      }

      .input-line {
        display: flex;
        flex-direction: column;
        gap: 10rpx;
        align-items: center;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: 10rpx;
        margin-bottom: 20rpx;

        .label {
          align-self: flex-start;
        }
        .button-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20rpx;
          .category-button {
            border-radius: 12rpx;
            color: #fff;
            text-align: center;
            padding: 5rpx 15rpx;
            transition: 0.2s ease;
            &:active {
              scale: 0.95;
            }

            &.edit {
              background-color: rgba(0, 229, 0, 0.4);
            }
            &.delete {
              background-color: rgba(218, 0, 0, 0.4);
            }
          }
        }
        .add-category-line {
          text-align: center;
          padding: 5rpx 15rpx;
          border: 1px solid rgba(0, 0, 0, 0.8);
          transition: 0.2s ease;
          &:active {
            scale: 0.95;
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
      .dish-line {
        display: flex;
        gap: 10rpx;
        align-items: center;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: 10rpx;
        margin-bottom: 20rpx;
        .dish-img {
          width: 100rpx;
          height: 100rpx;
          background-color: rgba(0, 0, 0, 0.2);
        }
        .label {
          text {
            font-weight: 550;
          }
        }
      }

      .btn {
        margin-top: 25rpx;
        width: 100%;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.8);
        transition: 0.2s ease;
        &:active {
          scale: 0.95;
        }
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
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rpx;
        .addDish-box {
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
