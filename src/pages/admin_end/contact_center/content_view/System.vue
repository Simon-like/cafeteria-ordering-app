<script lang="ts" setup>
import { ref, nextTick, reactive } from 'vue'
import type { AddressItem, ColleagueItem } from '@/types/admin_return'
import { debounce, splitContent, deepCopy } from '@/composables/tools'
import { onLoad } from '@dcloudio/uni-app'
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
  getAllPlace,
  updatePlace,
  addPlace,
  deletePlace,
  getCustomerServicePhone,
  updateCustomerServicePhone,
} from '@/services/admin/admin_api'
/**
 * @description 管理端联络中心页面系统设置模块
 * @author 应东林
 * @date 2024-10-26
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-31
 */

/**
 * @description 送餐地址设置
 */
// //编号随机生成函数
// function generateUniqueId(existingIds: string[]) {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   const digits = '0123456789'

//   // 生成一个随机的字母和数字的组合
//   function generateRandomId() {
//     const randomLetter = letters[Math.floor(Math.random() * letters.length)]
//     const randomDigit = digits[Math.floor(Math.random() * digits.length)]
//     return randomLetter + randomDigit
//   }

//   // 生成的编号
//   let newId

//   do {
//     newId = generateRandomId()
//   } while (existingIds.includes(newId)) // 如果生成的编号已存在，则重新生成

//   return newId
// }

//  送餐地址信息列表
const resaddress = ref<AddressItem[]>([])
// 当前选中的索引值，-1表示当前无地址选择，-2表示处于新增地址状态
const addressIndex = ref<number>(0)
const editaddress = reactive<AddressItem>({
  id: -1,
  addressNumber: '',
  address: '',
  deliveryPrice: 0,
})

const addressPopup = ref()
const addressActiveList = ref<boolean[]>(new Array(resaddress.value.length).fill(false))

// 获取所有地址信息并加载
const getAddress_loading = async () => {
  const res = await getAddress()
  if (res.code === 1) {
    resaddress.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: '获取地址信息失败！',
    })
  }
}

// 打开编辑框
const onEditaddress = () => {
  if (resaddress.value.length === 0) {
    addressIndex.value = -1
  } else {
    addressActiveList.value.fill(false)
    addressActiveList.value[0] = true
    Object.assign(editaddress, deepCopy(resaddress.value[0]))
  }
  addressPopup.value.open('center')
}

// 选择某条地址
const onChosseaddressLine = (index: number) => {
  addressActiveList.value.fill(false)
  addressActiveList.value[index] = true
  Object.assign(editaddress, resaddress.value[index])
  addressIndex.value = index
}

// 初始化参数
const Initaddress = () => {
  addressIndex.value = -1
  Object.assign(editaddress, { id: -1, addressNumber: '', address: '', deliveryPrice: 0 })
  addressActiveList.value.fill(false)
}

// //随机生成编号事件
// const onRandomly = () => {
//   editaddress.addressNumber = generateUniqueId(resaddress.value.map((item) => item.addressNumber))
// }

// 判断编号是否重复
const isRepetition = (newId: string) => {
  return resaddress.value.map((item) => item.addressNumber).includes(newId)
}

//修改或新增送餐地址
const onComfirnaddress = async () => {
  editaddress.deliveryPrice = +editaddress.deliveryPrice
  //校验
  if (!editaddress.address || !editaddress.addressNumber) {
    uni.showToast({
      icon: 'none',
      title: '请正确的填写地址信息！',
    })
    return
  }
  if (editaddress.deliveryPrice < 1) {
    uni.showToast({
      icon: 'none',
      title: '配送费用太低了！',
    })
    return
  }
  if (isRepetition(editaddress.addressNumber)) {
    uni.showToast({
      icon: 'none',
      title: '外卖地址编号不可以重复！',
    })
    return
  }
  //新增或者修改
  if (addressIndex.value === -2) {
    //新增地址
    const res = await addAddress(
      editaddress.address,
      editaddress.addressNumber,
      editaddress.deliveryPrice,
    )
    if (res.code === 1) {
      await getAddress_loading()
      uni.showToast({
        icon: 'none',
        title: '新增地址成功！',
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '新增地址信息失败！',
      })
    }
  } else {
    //修改地址
    const res = await updateAddress(
      editaddress.id,
      editaddress.address,
      editaddress.addressNumber,
      editaddress.deliveryPrice,
    )
    if (res.code === 1) {
      await getAddress_loading()
      uni.showToast({
        icon: 'none',
        title: '修改地址成功！',
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '修改地址信息失败！',
      })
    }
  }
}

//防抖
const onComfirnaddress__debounce = debounce(onComfirnaddress, 1000, true)

//确认配送地址删除
const address_delete_list = ref([
  {
    name: '确认删除',
    color: '#e50000',
    fontSize: '20',
  },
])
const address_delete_show = ref(false)
// 确认删除某条地址
const onDeleteaddress_comfirn = async () => {
  const res = await deleteAddress(resaddress.value[addressIndex.value].id)
  if (res.code === 1) {
    uni.showToast({
      icon: 'success',
      title: '删除地址成功！',
    })
    Initaddress()
    resaddress.value.splice(addressIndex.value, 1)
    addressActiveList.value.splice(addressIndex.value, 1)
    address_delete_show.value = false
  } else {
    uni.showToast({
      icon: 'error',
      title: '删除地址失败！',
    })
  }
}

// 删除某地址，打开弹出框
const onDeleteaddress = (index: number) => {
  onChosseaddressLine(index)
  address_delete_show.value = true
}

// 关闭弹出框
const onClose_address = () => {
  address_delete_show.value = false
}

// 取消地址编辑
const onCloseaddress = () => {
  Initaddress()
}

// 新增一个地址
const onAddaddress = () => {
  addressIndex.value = -2
  addressActiveList.value.fill(false)
  Object.assign(editaddress, { id: -1, addressNumber: '', address: '', deliveryPrice: 0 })
}

/**
 * @description 商家区域设置
 */

const regionPopup = ref()
//区域信息列表
const resRegion = ref<
  {
    region: string
    regionId: number
  }[]
>([])

const regionActiveList = ref<boolean[]>(new Array(resRegion.value.length).fill(false))
const RegionIndex = ref<number>(0)
const editRegion = reactive<{ region: string; regionId: number }>(
  deepCopy({ region: '', regionId: 0 }),
)

// 加载所有区域信息
const getAllRegion_loading = async () => {
  const res = await getAllPlace()
  if (res.code === 1) {
    resRegion.value = res.data
  } else {
    uni.showToast({
      icon: 'error',
      title: '获取区域信息失败！',
    })
  }
}

// 打开区域设置弹框
const onEditRegion = () => {
  if (resRegion.value.length === 0) {
    RegionIndex.value = -1
  } else {
    regionActiveList.value.fill(false)
    regionActiveList.value[0] = true
    Object.assign(editRegion, deepCopy(resRegion.value[0]))
  }
  regionPopup.value.open('center')
}

// 初始化参数
const InitRegion = () => {
  RegionIndex.value = -1
  Object.assign(editRegion, { region: '', regionId: -1 })
  regionActiveList.value.fill(false)
}

// 选择某条区域信息
const onChosseRegionLine = (index: number) => {
  regionActiveList.value.fill(false)
  regionActiveList.value[index] = true
  Object.assign(editRegion, resRegion.value[index])
  RegionIndex.value = index
}

// 确认区域信息修改或新增
const onComfirnRegion = async () => {
  if (!editRegion.region) {
    uni.showToast({
      icon: 'error',
      title: '名称不可为空！',
    })
    return
  }

  if (RegionIndex.value === -2) {
    //新增区域
    const res = await addPlace(editRegion.region)
    if (res.code === 1) {
      uni.showToast({
        icon: 'success',
        title: '新增成功！',
      })
      await getAllRegion_loading()
    } else {
      uni.showToast({
        icon: 'error',
        title: '新增失败！',
      })
    }
  } else {
    //修改区域
    const res = await updatePlace(editRegion.region, editRegion.regionId)
    if (res.code === 1) {
      await getAllRegion_loading()
      uni.showToast({
        icon: 'none',
        title: '修改区域成功！',
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '修改区域信息失败！',
      })
    }
  }
}

//防抖
const onComfirnRegion__debounce = debounce(onComfirnRegion, 1000, true)

//关闭编辑框
const onCloseRegion = () => {
  InitRegion()
}

//确认商家区域删除
const region_delete_list = ref([
  {
    name: '确认删除',
    color: '#e50000',
    fontSize: '20',
  },
])
const region_delete_show = ref(false)
// 确认删除某条地址
const onDeleteregion_comfirn = async () => {
  const res = await deletePlace(resRegion.value[RegionIndex.value].regionId)
  if (res.code === 1) {
    uni.showToast({
      icon: 'success',
      title: '删除区域成功！',
    })
    InitRegion()
    resRegion.value.splice(RegionIndex.value, 1)
    regionActiveList.value.splice(RegionIndex.value, 1)
    region_delete_show.value = false
  } else {
    uni.showToast({
      icon: 'success',
      title: '删除区域失败！',
    })
  }
}

// 删除某区域，打开弹出框
const onDeleteRegion = (index: number) => {
  onChosseRegionLine(index)
  region_delete_show.value = true
}

// 关闭弹出框
const onClose_region = () => {
  region_delete_show.value = false
}

// 新增一个区域
const onAddRegion = () => {
  RegionIndex.value = -2
  regionActiveList.value.fill(false)
  Object.assign(editRegion, { region: '', regionId: -1 })
}

// 取消弹框
const onBack = () => {
  addressPopup.value.close()
  regionPopup.value.close()
}
const onCloseBtn = () => {
  addressPopup.value.close()
  regionPopup.value.close()
}

/**
 * 客服电话修改
 */
const CSPhone = ref<string>('')
//获取客服电话
const getCSPhone = async () => {
  const res = await getCustomerServicePhone()
  if (res.code === 1) {
    CSPhone.value = res.data
  } else {
    uni.showToast({
      icon: 'error',
      title: '电话获取失败！',
    })
  }
}
//修改客服电话
const onUpdateCSPhone = async () => {
  if (CSPhone.value.length !== 11) {
    uni.showToast({
      icon: 'error',
      title: '电话格式错误！',
    })
    return
  }
  const res = await updateCustomerServicePhone(CSPhone.value)
  if (res.code === 1) {
    await getCSPhone()
    uni.showToast({
      icon: 'success',
      title: '电话修改成功！',
    })
  } else {
    uni.showToast({
      icon: 'error',
      title: '电话修改失败！',
    })
  }
}

// 数据加载
onLoad(async () => {
  await getAddress_loading()
  await getAllRegion_loading()
  await getCSPhone()
})
</script>

<template>
  <view class="system">
    <!-- 系统参数设置区域 -->
    <scroll-view scroll-y="true" class="scroll-wrapper">
      <!-- 送餐地址设置 -->
      <view class="section address-section">
        <view class="section-title">送餐固定地址设置：</view>
        <view class="section-content">
          <view class="line" v-show="resaddress.length === 0">没有内容呢</view>
          <view class="line" v-for="(item, index) in resaddress" :key="item.id">
            <view class="address">地址{{ index + 1 }}:{{ item.address }}</view>
            <view class="delivery-price">配送费：{{ item.deliveryPrice }}</view>
            <view class="address-number">编号：{{ item.addressNumber }}</view>
          </view>
        </view>
        <view class="btn align-end" @click="onEditaddress">修改信息</view>
      </view>

      <!-- 商家区域设置 -->
      <view class="section region-section">
        <view class="section-title">商家区域设置：</view>
        <view class="section-content">
          <view class="line" v-show="resRegion.length === 0">没有内容呢</view>
          <view class="line" v-for="(item, index) in resRegion" :key="item.regionId">
            <view class="region">区域{{ index + 1 }}：{{ item.region }}</view>
          </view>
        </view>
        <view class="btn align-end" @click="onEditRegion">修改信息</view>
      </view>

      <!-- 系统客服电话设置 -->
      <view class="section region-section">
        <view class="section-title">系统客服电话：</view>
        <view class="section-content">
          <view class="line">
            <uni-easyinput v-model="CSPhone" placeholder="请输入联系电话" type="number" />
          </view>
          <view class="btn align-end" @click="onUpdateCSPhone">修改电话</view>
        </view>
      </view>
    </scroll-view>
    <!-- 送餐地址信息编辑 -->
    <uni-popup ref="addressPopup" type="dialog">
      <view class="popup-content">
        <view class="close-btn" @click="onCloseBtn"><i class="iconfont icon-x"></i></view>
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="wrapper">
            <view class="line title-line">请点击某地址或者新增地址</view>
            <view class="line" v-for="(item, index) in resaddress" :key="item.id">
              <view
                class="y-wrapper"
                :class="{ active: addressActiveList[index] }"
                @click="onChosseaddressLine(index)"
              >
                <view class="title"
                  ><text>地址{{ index + 1 }}:</text>{{ item.address }}</view
                >
                <view class="x-wrapper">
                  <view class="deliveryPrice">配送费:{{ item.deliveryPrice }}</view>
                  <view class="address-number">编号:{{ item.addressNumber }}</view>
                </view>
              </view>
              <view @click="onDeleteaddress(index)"><i class="iconfont icon-jianhao"></i></view>
            </view>
            <view class="line add-line" style="justify-content: flex-start">
              <view
                class="add-address-line"
                @click="onAddaddress"
                :class="{ active: addressIndex === -2 }"
                ><i class="iconfont icon-jiahao"></i>新增地址</view
              >
            </view>
          </view>

          <!-- /修改框 -->
          <view class="wrapper add-wrapper" v-show="addressIndex !== -1">
            <view class="line">
              <view class="title"
                >{{ addressIndex === -2 ? '新增地址' : `地址${addressIndex + 1}` }}：</view
              >
            </view>
            <view class="line">
              <view class="title">名称：</view>
              <uni-easyinput v-model="editaddress.address" placeholder="请输入地址名称" />
            </view>
            <view class="line">
              <view class="title">配送费：</view>
              <uni-easyinput
                v-model="editaddress.deliveryPrice"
                placeholder="请输入配送费"
                type="number"
              />
            </view>
            <view class="line">
              <view class="title">编号：{{ editaddress.addressNumber }}</view>
              <uni-easyinput
                v-model="editaddress.addressNumber"
                placeholder="请输入编号"
                type="text"
              />
            </view>
            <view class="line btn-line">
              <view class="btn popup-confirm-btn" @click="onComfirnaddress__debounce"
                >确认编辑</view
              >
              <view class="btn popup-close-btn" @click="onCloseaddress">取消编辑</view>
            </view>
          </view>

          <view class="wrapper add-wrapper" v-show="addressIndex === -1">
            请点击选择一个地址或者新增地址
          </view>
          <view class="line">
            <view class="btn" @click="onBack">返回设置页面</view>
          </view>
          <!-- 修改框/ -->
        </scroll-view>
      </view>
    </uni-popup>

    <!-- 确认删除外卖配送地址 -->
    <up-action-sheet
      :actions="address_delete_list"
      :title="'确认删除提示'"
      :show="address_delete_show"
      :cancelText="'误点了'"
      @select="onDeleteaddress_comfirn"
      @close="onClose_address"
    ></up-action-sheet>

    <!-- 商家区域信息编辑 -->
    <uni-popup ref="regionPopup" type="dialog">
      <view class="popup-content">
        <view class="close-btn" @click="onCloseBtn"><i class="iconfont icon-x"></i></view>
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="wrapper">
            <view class="line title-line">请点击某区域或者新增区域</view>
            <view class="line" v-for="(item, index) in resRegion" :key="item.region">
              <view
                class="y-wrapper"
                :class="{ active: regionActiveList[index] }"
                @click="onChosseRegionLine(index)"
              >
                <view class="title">区域{{ index + 1 }}:{{ item.region }}</view>
              </view>
              <view @click="onDeleteRegion(index)"><i class="iconfont icon-jianhao"></i></view>
            </view>
            <view class="line add-line" style="justify-content: flex-start">
              <view
                class="add-region-line"
                @click="onAddRegion"
                :class="{ active: RegionIndex === -2 }"
                ><i class="iconfont icon-jiahao"></i>新增区域</view
              >
            </view>
          </view>

          <!-- /修改框 -->
          <view class="wrapper add-wrapper" v-show="RegionIndex !== -1">
            <view class="line">
              <view class="title"
                >{{ RegionIndex === -2 ? '新增区域' : `区域${RegionIndex + 1}` }}：</view
              >
            </view>
            <view class="line">
              <view class="title">名称：</view>
              <uni-easyinput v-model="editRegion.region" placeholder="请输入区域名称" />
            </view>

            <view class="line btn-line">
              <view class="btn popup-btn" @click="onComfirnRegion__debounce">确认编辑</view>
              <view class="btn popup-btn" @click="onCloseRegion">取消编辑</view>
            </view>
          </view>

          <view class="wrapper add-wrapper" v-show="RegionIndex === -1">
            请点击选择一个地址或者新增地址
          </view>
          <view class="line">
            <view class="btn" @click="onBack">返回设置页面</view>
          </view>
          <!-- 修改框/ -->
        </scroll-view>
      </view>
    </uni-popup>

    <!-- 确认删除商家区域提示框 -->
    <up-action-sheet
      :actions="region_delete_list"
      :title="'确认删除提示'"
      :show="region_delete_show"
      :cancelText="'误点了'"
      @select="onDeleteregion_comfirn"
      @close="onClose_region"
    ></up-action-sheet>
  </view>
</template>

<style lang="scss" scoped>
.system {
  width: 590rpx;
  height: 100%;
  font-size: 30rpx;
  padding: 30rpx 18rpx;
  .scroll-wrapper {
    width: 100%;
    height: 75vh;
  }
  .line {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15rpx;
    transition: all 0.2s ease-in;
    flex-wrap: wrap;
  }
  .btn {
    padding: 6rpx 35rpx;
    background: $bg-color-green;
    border-radius: 40rpx;
    font-weight: 550;
    text-align: center;
    white-space: nowrap;
    transition: 0.2s ease;
    &:active {
      scale: 0.95;
    }
  }
  .align-end {
    align-self: flex-end;
  }

  :deep(.uni-easyinput) {
    width: 300rpx;
    flex: 0;
    .uni-easyinput__content {
      width: 300rpx;
      uni-input {
        height: auto;
      }
    }
  }

  .x-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15rpx;
  }
  .y-wrapper {
    padding: 10rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15rpx;
    &.active {
      border-radius: 20rpx;
      background: $bg-color-green;
    }
  }

  .section {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20rpx;
    font-size: 30rpx;
    margin-bottom: 30rpx;
    background: $bg-color-light;
    padding: 20rpx;
    white-space: nowrap;
    overflow: hidden;
    .section-title {
      font-weight: 550;
      font-size: 32rpx;
      align-self: flex-start;
      color: $text-color-active;
    }
    .section-content {
      width: 100%;
      padding: 15rpx;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15rpx;
    }
  }

  .address-section {
    .address {
      font-weight: 550;
    }
    .delivery-price,
    .address-number {
      font-size: 26rpx;
    }
  }

  .popup-content {
    position: relative;
    width: 600rpx;
    height: 60vh;
    padding: 50rpx 26rpx;
    background: #fff;
    .close-btn {
      position: absolute;
      color: $text-color-green;
      top: 12rpx;
      right: 12rpx;
      font-size: 30rpx;
      transition: 0.2s ease;
      &:active {
        scale: 0.95;
      }
    }
    .iconfont {
      font-weight: 550;
      margin: 0 10rpx;
    }
    .wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 22rpx;
      margin-bottom: 22rpx;
      .line {
        justify-content: space-between;
        flex-wrap: nowrap;
        &.title-line {
          color: $text-color-green;
        }
      }
      .title,
      .add-line {
        font-weight: 550;
        font-size: 30rpx;
        text {
          color: $text-color-active;
        }
      }

      &.add-wrapper {
        background: $bg-color-light;
        padding: 10rpx;

        .line {
          justify-content: space-between;
        }
        .Randomly-btn {
          background: #fff;
          color: $text-color-green;
          border-radius: 0rpx;
          border: 1px solid $text-color-green;
        }
        .btn-line {
          justify-content: center;
          gap: 45rpx;
          .popup-close-btn {
            background: #fff;
            border: 1px solid $text-color-green;
          }
        }
      }
    }

    .add-address-line,
    .add-region-line {
      padding: 10rpx;
      color: $text-color-active;
      border-radius: 20rpx;
      &.active {
        background: $bg-color-green;
        color: #000;
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

:deep(.uni-easyinput__content) {
  background-color: $bg-color-light !important;
  border: 2rpx solid $text-color-green !important;
  border-radius: 10rpx;
  color: $text-color-active;
  height: 50rpx;
}
:deep(.uni-easyinput__placeholder-class) {
  color: $text-color-green;
}
</style>
