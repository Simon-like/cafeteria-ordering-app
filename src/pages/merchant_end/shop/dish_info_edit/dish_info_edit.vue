<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { useMerchantShopStore } from '@/stores'
import { upload } from '@/utils/http'
import type { categoryType, dishData, specItem, specOptionsItem } from '@/types/merchant_return'
import {
  updateDishNot,
  getDishById,
  updateDish,
  getAllCategory,
  downDish,
  upDish,
} from '@/services/merchant/merchant_shop_dish_api'
import { debounce, deepCopy } from '@/composables/tools'
/**
 * @description 菜品信息修改页面
 * @author 应东林
 * @date 2024-09-23
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-22
 */

const MerchantShopStore = useMerchantShopStore()

// 该菜品的信息

const dish_info_data = ref<dishData>({
  id: 0,
  dishName: '',
  dishDescription: '',
  price: 0,
  discount: 0,
  discountedPrice: 0,
  imageUrl: '',
  categoryList: [],
  dishStatus: 0, // 菜品的状态，热销0、缺货1、下架2，其他3
  isDiscounted: 0, // 是否打折。0表示不打折，1表示打折
  isDeliver: 0, // 单点是否配送。0表示单点不配送，1单点配送
  todayInventory: 0,
  specList: [], // 规格S
})

const back = () => {
  MerchantShopStore.initializeDishInfo()
  uni.reLaunch({
    url: '/pages/merchant_end/merchant_index',
  })
}

const inventoryMinus = () => {
  if (dish_info_data.value.todayInventory === 0) {
    uni.showToast({
      icon: 'none',
      title: '数量已经达到最小值',
    })
  } else {
    dish_info_data.value.todayInventory--
  }
}
const inventoryAdd = () => {
  dish_info_data.value.todayInventory++
}

const priceMinus = () => {
  if (dish_info_data.value.price === 0) {
    uni.showToast({
      icon: 'none',
      title: '定价已经达到最小值',
    })
  } else {
    dish_info_data.value.price--
  }
}
const priceAdd = () => {
  dish_info_data.value.price++
}

const onPriceCheck = () => {
  if (dish_info_data.value.price <= 0) {
    uni.showToast({
      icon: 'none',
      title: '定价已经达到最小值',
    })
    dish_info_data.value.price = 0
  }
}

const discountMinus = () => {
  if (dish_info_data.value.discount === 0.1) {
    uni.showToast({
      icon: 'none',
      title: '折扣已经达到最小值',
    })
  } else {
    dish_info_data.value.discount -= 0.05
    dish_info_data.value.discount = +dish_info_data.value.discount.toFixed(2)
  }
}
const discountAdd = () => {
  if (dish_info_data.value.discount === 1) {
    uni.showToast({
      icon: 'none',
      title: '折扣已经达到最大值',
    })
  } else {
    dish_info_data.value.discount += 0.05
    dish_info_data.value.discount = +dish_info_data.value.discount.toFixed(2)
  }
}

// 折扣转数字类型
const limitDecimalPlaces = () => {
  if (dish_info_data.value.discount >= 1) {
    uni.showToast({
      icon: 'none',
      title: '折扣已经达到最大值',
    })
    dish_info_data.value.discount = 1
  } else if (dish_info_data.value.discount <= 0.1) {
    uni.showToast({
      icon: 'none',
      title: '折扣已经达到最小值',
    })
    dish_info_data.value.discount = 0.1
  } else {
    dish_info_data.value.discount = +dish_info_data.value.discount.toFixed(2)
  }
}

// 分组信息数据（未有的分组信息）
const categoryData = ref<categoryType[]>([])
// 分组选择列表
const category_choose_list = ref<
  {
    categoryId: number
    isChoose: boolean
  }[]
>([])

// 请求并渲染分组信息
const categoryLoading = async () => {
  category_choose_list.value = []
  categoryData.value = []
  const res = await getAllCategory()
  if (+res.code === 1) {
    categoryData.value = res.data.filter(
      (item) =>
        !dish_info_data.value.categoryList.find((value) => value.categoryId === item.categoryId),
    )
    categoryData.value.forEach((item) => {
      category_choose_list.value.push({ categoryId: item.categoryId, isChoose: false })
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '分组信息获取失败',
    })
  }
}

const categoryPopup = ref()
const onAddCategory = async () => {
  await categoryLoading()
  categoryPopup.value.open('center')
}

const onChoose = (index: number) => {
  category_choose_list.value[index].isChoose = !category_choose_list.value[index].isChoose
}

const onConfirmAddCategory = () => {
  for (let i = 0; i < category_choose_list.value.length; i++) {
    if (category_choose_list.value[i].isChoose) {
      dish_info_data.value.categoryList.push(categoryData.value[i])
    }
  }
  categoryPopup.value.close()
}
const onCancel = (index: number) => {
  dish_info_data.value.categoryList.splice(index, 1)
}

const Range = [
  { value: 0, text: '单点不送' },
  { value: 1, text: '可配送' },
]

// 更改封面
const fileList = ref<Object[]>([])
const logoPickerPopup = ref()

const openLogoPicker = () => {
  logoPickerPopup.value.open('center')
}

// 新增图片
const afterRead = async (event: Object) => {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file)
  lists.map((item) => {
    fileList.value.push({
      ...item,
    })
  })
}

// 删除图片
const deletePic = (event: any) => {
  fileList.value.splice(event.index, 1)
}

const uploadImg = async () => {
  function extractHttpLink(s: string) {
    // 使用正则表达式匹配 HTTP 或 HTTPS 开头的链接
    const pattern = /https?:\/\/[^\s"]+/
    const match = s.match(pattern)
    if (match) {
      return match[0]
    } else {
      return null // 如果没有找到匹配的链接，返回 null
    }
  }
  for (let i = 0; i < fileList.value.length; i++) {
    console.log(fileList.value[i])
    const result = await upload('/merchant/dish/uploadImage', fileList.value[i].url)
    dish_info_data.value.imageUrl = extractHttpLink(result.data) as string
    uni.showToast({
      title: `图片修改成功！`,
    })
    logoPickerPopup.value.close()
  }
}

const onSave = async () => {
  if (
    !dish_info_data.value.imageUrl ||
    !dish_info_data.value.dishName ||
    !dish_info_data.value.dishDescription
  ) {
    uni.showToast({
      icon: 'none',
      title: '菜品名称、菜品封面、菜品描述不可为空！',
    })
    return
  }

  console.log(specList.value)
  //检查规格列表是否有不合法选项
  if (specList.value.find((item) => !item.specTitle || item.specOptions.length === 0)) {
    uni.showToast({
      icon: 'none',
      title: '存在信息不完善的规格！',
      duration: 3500,
    })
    return
  }

  dish_info_data.value.specList = specList.value
  const list = dish_info_data.value.categoryList.map((item) => item.categoryId)
  const res = await updateDishNot(
    dish_info_data.value.id,
    dish_info_data.value.dishName,
    dish_info_data.value.dishDescription,
    dish_info_data.value.discount,
    dish_info_data.value.imageUrl,
    list,
    dish_info_data.value.dishStatus, // 菜品的状态，热销0、缺货1、下架2，其他3
    dish_info_data.value.isDiscounted, // 是否打折。0表示不打折，1表示打折
    dish_info_data.value.isDeliver, // 单点是否配送。0表示单点不配送，1单点配送
    dish_info_data.value.todayInventory,
    dish_info_data.value.specList,
  )
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '成功修改菜品信息！',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '菜品信息修改失败',
    })
  }
}

const onAdjustPricing = async () => {
  const res = await updateDish(dish_info_data.value.id, dish_info_data.value.price)
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '请求发送成功，请等待审核！',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '请求发送失败',
    })
  }
}

// 下架菜品

const onDownDish = async () => {
  const res = await downDish(dish_info_data.value.id)
  if (+res.code === 1) {
    await getDishById_loading(dish_info_data.value.id)
    uni.showToast({
      icon: 'none',
      title: '菜品下架成功',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '菜品下架失败',
    })
  }
}

const oldPrice = ref<number>(0)

// 修改后的规格信息

const specList = ref<specItem[]>([])

let specValue = ref<specItem>({
  specTitle: '',
  isEssential: false,
  id: -1,
  specOptions: [],
})

// // 很奇怪，要单独列一个变量
const OptionsList = ref<string[]>([])

//新增规格
const onAddSpec = () => {
  specList.value.push({
    specTitle: '',
    isEssential: false,
    id: -1,
    specOptions: [],
  })
}

// 规格面板的控制
const specPopup = ref()
const specIndex = ref<number>(0)

// 打开某一规格
const onSpecOpen = (index: number) => {
  specPopup.value.open('bottom')
  Object.assign(specValue.value, deepCopy(specList.value[index]))
  OptionsList.value = []
  specValue.value.specOptions.forEach((item) => OptionsList.value.push(item.optionsName))
  specIndex.value = index
}

// 保存规格
const onSpecOptionSave = () => {
  OptionsList.value.forEach((item, index) => {
    specValue.value.specOptions[index].optionsName = item
  })
  console.log(specValue.value)
  if (specValue.value.specOptions.find((item) => !item.optionsName)) {
    uni.showToast({
      icon: 'none',
      title: '不允许出现空的规格选项！\n请仔细检查',
      duration: 3000,
    })
  } else {
    Object.assign(specList.value[specIndex.value], deepCopy(specValue.value))
    specPopup.value.close()
    uni.showToast({
      icon: 'none',
      title: '保存成功',
    })
  }
}

// 删除某一规格选项
const onCloseSpec = (index: number) => {
  specValue.value.specOptions.splice(index, 1)
  OptionsList.value.splice(index, 1)
}

// 新增规格选项
const onAddSpecOptions = () => {
  specValue.value.specOptions.push({
    optionsName: '',
    price: 0,
  })
  OptionsList.value.push('')
}

// 关闭规格弹窗
const onClose = () => {
  specPopup.value.close()
}

const deleteSpecIDList = ref<number[]>([])
const specDeletePopup = ref()
const onDeleteSpec = () => {
  specDeletePopup.value.open('center')
}

// 返回，不删除
const onReturn = () => {
  specDeletePopup.value.close()
}

// 确认删除规格
const onConfirm = () => {
  if (specList.value[specIndex.value].id != -1)
    deleteSpecIDList.value.push(specList.value[specIndex.value].id)
  specList.value.splice(specIndex.value, 1)
  specDeletePopup.value.close()
  specPopup.value.close()
  uni.showToast({
    icon: 'none',
    title: '如果错误删除了，请不要点击保存！\n退出编辑页面再返回可刷新数据！',
    duration: 3500,
  })
}

const onCheck = (index: number) => {
  if (specValue.value.specOptions[index].price < 0) {
    specValue.value.specOptions[index].price = 0
    uni.showToast({
      icon: 'none',
      title: '附加价值不允许为负值',
    })
  }
}

const getDishById_loading = async (id: number) => {
  const res = await getDishById(id)
  if (+res.code === 1) {
    dish_info_data.value = res.data
    specList.value = []
    oldPrice.value = dish_info_data.value.price
    //需要解耦出来哦！！！
    dish_info_data.value.specList.forEach((item) => {
      specList.value.push(item)
    })

    if (dish_info_data.value.imageUrl === null) {
      fileList.value = []
    } else {
      fileList.value.push({ url: dish_info_data.value.imageUrl })
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: '菜品信息获取失败！',
    })
  }
}

onLoad(async (getData: any) => {
  await getDishById_loading(getData.id)
})

const onDiscountedSwitch = () => {
  //未打折切换打折，价格顶一个基本值
  if (!dish_info_data.value.isDiscounted) {
    dish_info_data.value.discount = 0.9
  } else {
    dish_info_data.value.discount = 1
  }
  dish_info_data.value.isDiscounted = dish_info_data.value.isDiscounted ? 0 : 1
}
const onUpDish = async () => {
  const res = await upDish(dish_info_data.value.id)
  if (res.code === 1) {
    await getDishById_loading(dish_info_data.value.id)
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
  <view class="edit-view">
    <custom-nav-bar></custom-nav-bar>
    <view class="section-header">
      <view class="title">信息设置</view>
      <view class="back-btn" @click="back"><i class="iconfont icon-zuojiantou"></i></view>
    </view>
    <view class="basic-info section">
      <view class="section-title">基本信息</view>
      <view class="info-wrapper">
        <view class="info-line">
          <view class="line-title">菜品名称：</view>
          <input
            type="text"
            class="dishName-input"
            v-model="dish_info_data.dishName"
            placeholder="请填写菜品名称"
          />
        </view>
        <view class="info-line category">
          <view class="line-title">菜品分组：</view>
          <view class="wrapper">
            <view
              class="value"
              v-for="(item, index) in dish_info_data.categoryList"
              :key="item.categoryName"
            >
              {{ item.categoryName }}
              <i class="iconfont icon-x" @click="onCancel(index)"></i>
            </view>
            <view class="add-category" @click="onAddCategory">
              <i class="iconfont icon-jia"></i><text>新增分组</text>
            </view>
          </view>
        </view>
        <view class="info-line">
          <view class="line-title">今日库存：</view>
          <view class="value number">
            <view class="minus" @click="inventoryMinus">-</view>
            <input type="number" class="inventory-input" v-model="dish_info_data.todayInventory" />
            <view class="add" @click="inventoryAdd">+</view>
          </view>
        </view>
        <view class="info-line">
          <view class="line-title">外送信息：</view>
          <uni-data-select
            class="dishName-input"
            v-model="dish_info_data.isDeliver"
            :localdata="Range"
            placeholder="请选择此外送信息"
          ></uni-data-select>
        </view>
        <view class="info-line">
          <view class="line-title">封面：</view>
          <image
            :src="dish_info_data.imageUrl"
            mode="aspectFill"
            class="dish-img"
            @click="openLogoPicker()"
          ></image>
        </view>
      </view>
    </view>
    <view class="price-info section">
      <view class="section-title">价格信息</view>
      <view class="info-wrapper">
        <view class="info-line">
          <view class="line-title">菜品定价：</view>
          <view class="value number">
            <view class="minus" @click="priceMinus">-</view>
            <input
              type="number"
              class="inventory-input"
              v-model="dish_info_data.price"
              @input="onPriceCheck()"
            />
            <view class="add" @click="priceAdd">+</view>
          </view>
        </view>

        <view class="info-line status-line">
          <view class="status OK" v-if="oldPrice === dish_info_data.price">状态：审核通过</view>
          <view class="status" v-else>状态：审核未通过</view>
          <view class="btn" @click="onAdjustPricing">确认提交</view>
        </view>

        <view class="info-line">
          <view class="line-title">折扣设置：</view>
          <view class="btn" @click="onDiscountedSwitch">
            {{ dish_info_data.isDiscounted ? '取消折扣' : '设置折扣' }}
          </view>
          <view class="value number" v-show="dish_info_data.isDiscounted">
            <view class="minus" @click="discountMinus">-</view>
            <input
              type="number"
              class="inventory-input"
              v-model="dish_info_data.discount"
              @input="limitDecimalPlaces"
            />
            <view class="add" @click="discountAdd">+</view>
          </view>
        </view>

        <view class="info-line" v-show="dish_info_data.isDiscounted">
          <view class="discountPrice"
            >折后价:{{ (dish_info_data.price * dish_info_data.discount).toFixed(2) }}</view
          >
        </view>
      </view>
    </view>
    <view class="spec-info section">
      <view class="section-title">规格信息(可不填写)</view>
      <view class="info-wrapper">
        <view class="info-line" v-for="(item, index) in specList" :key="item.specTitle">
          <view class="line-title">规格{{ index + 1 }}:{{ item.specTitle }}</view>
          <view @click="onSpecOpen(index)">
            去设置规格选项<i class="iconfont icon-youjiantou-"></i
          ></view>
        </view>
        <view class="info-line">
          <view class="spec-add" @click="onAddSpec"
            ><i class="iconfont icon-jia"></i><text>新增规格</text></view
          >
        </view>
      </view>
    </view>

    <view class="desc-info section">
      <view class="section-title">菜品描述</view>
      <view class="info-wrapper">
        <uni-easyinput
          type="textarea"
          v-model="dish_info_data.dishDescription"
          autoHeight
          placeholder="请描述该菜品的特征,用后续商品的展示"
          :styles="{
            color: '#000',
            borderColor: 'rgba(25, 196, 126, 0.7)',
            borderRadius: '20px',
            backgroundColor: '#f4fff3',
          }"
          :placeholderStyle="'color:rgba(0, 0, 0, 0.5);font-size:14px'"
        ></uni-easyinput>
      </view>
    </view>

    <uni-popup ref="categoryPopup" border-radius="10px 10px 0 0" type="dialog">
      <uni-card class="form-card">
        <scroll-view scroll-y="true" class="scroll-Y">
          <uni-section title="需要添加的分组信息" type="line">
            <view class="wrapper">
              <view
                class="category-item"
                v-for="(value, index) in categoryData"
                @click="onChoose(index)"
                :key="value.categoryName"
              >
                {{ value.categoryName }}
                <i
                  class="iconfont"
                  :class="{ 'icon-dian': category_choose_list[index].isChoose }"
                ></i>
              </view>
            </view>
            <view class="btn" @click="onConfirmAddCategory">确认添加</view>
          </uni-section>
        </scroll-view>
      </uni-card>
    </uni-popup>
    <!-- 详细规格信息弹窗 -->
    <uni-popup ref="specPopup" type="dialog" border-radius="10px 10px 0 0" :mask-click="false">
      <view class="specWrapper">
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="headerTitle">
            <view class="header-specName">规格{{ specIndex + 1 }}</view>
            <view class="close-spec-btn" @click="onClose"><i class="iconfont icon-x1"></i></view>
          </view>
          <view class="specTitle box">
            <view class="title">名称(必填)：</view>
            <view class="dishSpec-box">
              <input
                type="text"
                class="dishSpec-input"
                v-model="specValue.specTitle"
                placeholder="请填写规格名称"
              />
            </view>
          </view>
          <view class="specOptions box">
            <view clas="specOptions-title">选项列表(必填):</view>
            <view
              class="line"
              v-for="(item, index) in specValue.specOptions"
              :key="item.optionsName"
            >
              <view class="closeBtn" @click="onCloseSpec(index)"
                ><i class="iconfont icon-jianhao"></i
              ></view>
              <view style="display: flex; align-items: center; gap: 10rpx">
                <h5>选项{{ index + 1 }}:</h5>
                <input
                  type="text"
                  class="dishSpec-input"
                  v-model="OptionsList[index]"
                  placeholder="请填写名称"
                />
              </view>
              <view class="number">
                <view>附加价格：</view>
                <input
                  type="number"
                  class="specNumber-input"
                  v-model="item.price"
                  @input="onCheck(index)"
                />
              </view>
            </view>
            <view class="line">
              <view class="spec-add" @click="onAddSpecOptions"
                ><i class="iconfont icon-jia"></i
                ><text>选项{{ specValue.specOptions.length + 1 }}</text></view
              >
            </view>
          </view>

          <view class="essential box">
            <view class="title">是否必选：</view>
            <view class="essential-wrapper">
              <view
                class="essential-btn"
                :class="{ active: specValue.isEssential }"
                @click="specValue.isEssential = true"
                >是</view
              >
              <view
                class="essential-btn"
                :class="{ active: !specValue.isEssential }"
                @click="specValue.isEssential = false"
                >否</view
              >
            </view>
          </view>
          <view class="btn-line">
            <view class="save-btn confirm" @click="onSpecOptionSave">保存</view>
            <view class="save-btn delete" @click="onDeleteSpec">删除规格</view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>

    <uni-popup ref="logoPickerPopup" type="bottom" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section title="设置菜品封面" type="line">
          <up-upload
            :fileList="fileList"
            @delete="deletePic"
            @afterRead="afterRead"
            multiple
            name="1"
            :maxCount="1"
            :previewFullImage="true"
            class="img-picker"
          ></up-upload>
          <view class="uploadBtn" @click="uploadImg">确认上传</view>
        </uni-section>
      </uni-card>
    </uni-popup>

    <uni-popup ref="specDeletePopup" type="dialog" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section title="删除提示" type="line">
          <view style="font-weight: 550">您确定要删除这条规格的所有信息吗？</view>
          <view style="display: flex; width: 100%">
            <view class="close btn" @click="onReturn">手滑了</view>
            <view class="confirm btn" @click="onConfirm">确认删除</view>
          </view>
        </uni-section>
      </uni-card>
    </uni-popup>

    <view class="button-box">
      <view class="save btn" @click="onSave">保存</view>
      <view class="discontinued btn" v-if="dish_info_data.dishStatus === 2" @click="onUpDish"
        >重新上架</view
      >
      <view class="discontinued btn" @click="onDownDish" v-else>下架</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.edit-view {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rpx 20rpx 20rpx 20rpx;
  gap: 60rpx;
  .specWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 45rpx 20rpx 15rpx 20rpx;
    gap: 60rpx;
    background: #fff;
    border-top: 1px solid #000;

    .headerTitle {
      font-size: 44rpx;
      margin-bottom: 40rpx;
      display: flex;
      justify-content: space-between;
      .header-specName {
        font-weight: 550;
        color: $text-color-green;
      }
      .close-spec-btn .iconfont {
        padding: 5rpx;
        font-size: 44rpx;
        text-align: center;
        transition: 0.2s ease;
        color: $text-color-green;
        &:active {
          scale: 0.95;
        }
      }
    }
    .box {
      white-space: nowrap;
      width: 100%;
      padding: 14rpx 14rpx 20rpx 14rpx;
      background: $bg-color-light;
      margin-bottom: 40rpx;
      display: flex;
      justify-content: space-between;
      &.specTitle {
        align-items: center;
      }

      .dishSpec-box {
        display: flex;
        align-items: center;
        height: 100%;
        .dishSpec-input {
          border: 1px solid $bg-color-dark;
          width: 300rpx;
          padding: 8rpx;
          font-size: 30rpx;
          outline: none;
          height: 100%;
          background: transparent;
          border-radius: 20rpx;
        }
      }
    }

    .specOptions {
      flex-direction: column;
      gap: 20rpx;
      .line {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30rpx;
        .spec-add {
          padding: 5rpx;
          text-align: center;
          border-radius: 16rpx;
          background-color: $bg-color-dark;
          transition: 0.2s ease;
          color: #fff;
          &:active {
            scale: 0.95;
          }
          i {
            color: #fff;
            margin-right: 5rpx;
          }
        }
        .dishSpec-input {
          width: 200rpx;
          border: 1px solid $bg-color-dark;
          padding: 8rpx;
          font-size: 30rpx;
          outline: none;
          border-radius: 10rpx;
          height: 100%;
          background: transparent;
        }
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8rpx;
          .specNumber-input {
            outline: none;
            width: 80rpx;
            background: transparent;
            border-bottom: 1px solid $bg-color-dark !important;
            text-align: center;
          }
        }
        .closeBtn {
          transition: 0.2s ease;
          font-size: 30rpx;
          color: $bg-color-dark;
          &:active {
            scale: 0.9;
          }
        }
      }
      .specOptions-title {
        color: $text-color-green !important;
        font-size: 25rpx;
      }
    }

    .essential {
      align-items: center;
      .essential-wrapper {
        display: flex;
        align-items: center;
        gap: 50rpx;
        .essential-btn {
          padding: 10rpx 80rpx;
          border-radius: 24rpx;
          background: #fff;
          color: #000;
          text-align: center;
          font-weight: 550;
          transition: 0.2s ease;
          &:active {
            scale: 0.9;
          }
          &.active {
            background: $common-color-green;
          }
        }
      }
    }

    .btn-line {
      display: flex;
      width: 100%;
      gap: 40rpx;
      .save-btn {
        flex: 1;
        padding: 20rpx 0;
        border-radius: 24rpx;
        text-align: center;
        font-weight: 550;
        transition: 0.2s ease;
        &.confirm {
          background: $bg-color-green;
          color: #000;
        }
        &.delete {
          background: $bg-color-light;
          border: 1px solid $bg-color-orange;
          color: #000;
        }
        &:active {
          scale: 0.9;
        }
      }
    }
  }

  .form-card {
    width: 500rpx;
    .wrapper {
      width: 100%;
      margin-bottom: 20rpx;
      display: flex;
      gap: 15rpx;
      .category-item {
        border: 1px solid rgb(0, 0, 0);
        border-radius: 16rpx;
        padding: 5rpx;
        text-align: center;
        position: relative;
        transition: 0.2s ease;
        &:active {
          scale: 0.95;
        }
        i {
          position: absolute;
          color: rgb(0, 223, 0);
          font-size: 50rpx;
          top: -30rpx;
          right: -30rpx;
        }
      }
    }
    .btn {
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.8);
      text-align: center;
      padding: 10rpx 0;
      font-weight: 550;
      transition: 0.2s ease;
      &:active {
        scale: 0.9;
      }
    }
  }

  .section-header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    .title {
      font-size: 50rpx;
      font-weight: 550;
      margin: 0 auto;
    }

    .back-btn {
      position: absolute;
      left: 10rpx;
      top: 0;
      padding: 10rpx;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 16rpx;
      font-weight: 550;
      transition: 0.2s ease;
      &:active {
        scale: 0.9;
      }
    }
  }
  .section {
    width: 100%;

    .section-title {
      margin-left: 20rpx;
      margin-bottom: 15rpx;
    }
    .info-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: $bg-color-light;
      gap: 40rpx;
      padding: 30rpx;
      .info-line {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .dishName-input {
          border: 1px solid $bg-color-dark;
          width: 300rpx;
          border-radius: 10rpx;
          padding: 8rpx;
          height: 100%;
          font-size: 30rpx;
          outline: none;
          background: transparent;
        }

        .discountPrice {
          margin-left: auto;
          color: $text-color-gray;
        }

        .spec {
          border: 1px solid rgb(0, 0, 0);
          border-radius: 16rpx;
          padding: 5rpx;
          text-align: center;
        }
        .spec-add {
          padding: 10rpx 15rpx;
          text-align: center;
          border-radius: 30rpx;
          border: 1px solid $text-color-active;
          background-color: #fff;
          transition: 0.2s ease;
          &:active {
            scale: 0.95;
          }
          i {
            color: $text-color-active;
            margin-right: 5rpx;
          }
        }

        .dishSpec-box {
          display: flex;
          align-items: center;
          height: 100%;
          .dishSpec-input {
            border: 1px solid rgba(0, 0, 0, 0.6);
            border-right: none;
            width: 300rpx;
            padding: 5rpx;
            font-size: 30rpx;
            outline: none;
            height: 100%;
            background: transparent;
          }
          .closeBtn {
            border: 1px solid rgba(0, 0, 0, 0.6);
            padding: 5rpx;
            transition: 0.2s ease;
            font-size: 30rpx;
            height: 100%;

            &:active {
              scale: 0.9;
            }
          }
        }
        .dish-img {
          width: 150rpx;
          height: 150rpx;
          background-color: rgba(0, 0, 0, 0.2);
        }

        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8rpx;
          .minus,
          .add {
            width: 30rpx;
            height: 30rpx;
            font-size: 30rpx;
            text-align: center;
            line-height: 30rpx;
            border-radius: 50%;
            color: #fff;
            font-weight: blod;
            background-color: $bg-color-dark;
            transition: 0.2s ease;
            &:active {
              scale: 0.95;
            }
          }
          input {
            outline: none;
            width: 80rpx;
            background: transparent;
            border-bottom: 1px solid $bg-color-dark;
            text-align: center;
          }
        }
      }

      .category {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10rpx;
        .wrapper {
          border: 1px solid $bg-color-dark;
          width: 100%;
          padding: 20rpx;
          display: flex;
          flex-wrap: wrap;
          gap: 20rpx;
          .value {
            border: 1px solid $bg-color-dark;
            border-radius: 16rpx;
            padding: 5rpx;
            text-align: center;
            position: relative;
            i {
              position: absolute;
              color: $bg-color-orange;
              font-size: 30rpx;
              top: -10rpx;
              right: -10rpx;
              transition: 0.2s ease;
              &:active {
                scale: 0.95;
              }
            }
          }
          .add-category {
            padding: 5rpx;
            text-align: center;
            border-radius: 30rpx;
            border: 1px solid $text-color-active;
            background-color: #fff;
            transition: 0.2s ease;
            &:active {
              scale: 0.95;
            }
            i {
              color: $text-color-active;
              margin-right: 5rpx;
            }
          }
        }
      }

      .status-line {
        margin-top: -30rpx;
      }
      .status {
        min-width: 200rpx;
        background-color: $bg-color-gray-light;
        color: $bg-color-orange;
        border-radius: 16rpx;
        font-size: 25rpx;
        white-space: nowrap;
        text-align: center;
        padding: 5rpx;
        &.OK {
          background-color: $common-color-green;
          color: #fff;
        }
      }
      .btn {
        width: 200rpx;
        text-align: center;
        padding: 5rpx;
        color: #000;
        background-color: $bg-color-green;
        border-radius: 16rpx;
        transition: 0.2s ease;
        &:active {
          scale: 0.95;
        }
      }
    }
  }

  .button-box {
    margin-top: 60rpx;

    width: 100%;
    display: flex;
    gap: 70rpx;
    justify-content: space-between;
    align-items: center;
    .btn {
      height: 80rpx;
      flex: 1;
      font-size: 45rpx;
      color: #000;
      border-radius: 16rpx;
      font-weight: 550;
      transition: 0.2s ease;
      text-align: center;
      line-height: 80rpx;
      &.save {
        background-color: $bg-color-green;
      }
      &.discontinued {
        background: $bg-color-light;
        border: 1px solid $bg-color-orange;
      }
      &:active {
        scale: 0.9;
      }
    }
  }
}

// 样式穿透
:deep(.uni-stat__select) {
  background-color: $bg-color-light;
  border: 2rpx solid $text-color-green;
  border-radius: 10rpx;
  color: $text-color-active;
}
:deep(.uni-select__input-text) {
  color: $text-color-active;
}
:deep(.uni-select) {
  border: none;
}
:deep(.uni-icons) {
  color: $text-color-active !important;
}
</style>
