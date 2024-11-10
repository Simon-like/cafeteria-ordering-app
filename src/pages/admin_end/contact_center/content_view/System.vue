<script lang="ts" setup>
import { ref, nextTick, reactive } from 'vue'
import type { AddressItem, ColleagueItem } from '@/types/admin_return'
import { debounce, splitContent, deepCopy } from '@/composables/tools'
import { onLoad } from '@dcloudio/uni-app'
import { addAddress, deleteAddress, getAddress, updateAddress } from '@/services/admin/admin_api'
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
//编号随机生成函数
function generateUniqueId(existingIds: string[]) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'

  // 生成一个随机的字母和数字的组合
  function generateRandomId() {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)]
    const randomDigit = digits[Math.floor(Math.random() * digits.length)]
    return randomLetter + randomDigit
  }

  // 生成的编号
  let newId

  do {
    newId = generateRandomId()
  } while (existingIds.includes(newId)) // 如果生成的编号已存在，则重新生成

  return newId
}

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

//  送餐地址信息列表
const resaddress = ref<AddressItem[]>([
  { id: 10, addressNumber: 'A8', address: '11公寓', deliveryPrice: 75.5 },
  { id: 12, addressNumber: 'A7', address: '15公寓', deliveryPrice: 75.5 },
  { id: 13, addressNumber: 'A45', address: '17公寓', deliveryPrice: 75.5 },
  { id: 15, addressNumber: 'A3', address: '18公寓', deliveryPrice: 75.5 },
])
// 当前选中的索引值，-1表示当前无地址选择，-2表示处于新增地址状态
const addressIndex = ref<number>(0)
const editaddress = reactive<addressItem>({
  id: -1,
  addressNumber: '',
  address: '',
  deliveryPrice: 0,
})

const addressPopup = ref()

const addressActiveList = ref<boolean[]>(new Array(resaddress.value.length).fill(false))

// 编辑某地址
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

//随机生成编号事件
const onRandomly = () => {
  editaddress.addressNumber = generateUniqueId(resaddress.value.map((item) => item.addressNumber))
}

//修改送餐地址
const onComfirnaddress = async () => {
  editaddress.deliveryPrice = +editaddress.deliveryPrice
  if (addressIndex.value === -2) {
    //保存新增地址信息
    // resaddress.value.push(deepCopy(editaddress))
    // addressActiveList.value.push(true)
    // addressIndex.value = resaddress.value.length - 1
    const res = await addAddress(
      editaddress.address,
      editaddress.addressNumber,
      editaddress.deliveryPrice,
    )
    if (res.code === 1) {
      await getAddress_loading()
    } else {
      uni.showToast({
        icon: 'none',
        title: '新增地址信息失败！',
      })
    }
  } else {
    Object.assign(resaddress.value[addressIndex.value], deepCopy(editaddress))
  }
}

//防抖
const onComfirnaddress__debounce = debounce(onComfirnaddress, 1000, true)

// 删除某地址
const onDeleteaddress = (index: number) => {
  Initaddress()
  resaddress.value.splice(index, 1)
  addressActiveList.value.splice(index, 1)
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
const resRegion = ref([
  { region: '学子', regionId: 213 },
  { region: '学苑', regionId: 213 },
])

const regionActiveList = ref<boolean[]>(new Array(resRegion.value.length).fill(false))
const RegionIndex = ref<number>(0)
const editRegion = reactive<{ region: string; regionId: number }>(
  deepCopy({ region: '', regionId: 0 }),
)
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

const onChosseRegionLine = (index: number) => {
  regionActiveList.value.fill(false)
  regionActiveList.value[index] = true
  Object.assign(editRegion, resRegion.value[index])
  RegionIndex.value = index
}

const onComfirnRegion = () => {
  if (RegionIndex.value === -2) {
    //保存新增地址信息
    resRegion.value.push(deepCopy(editRegion))
    regionActiveList.value.push(true)
    RegionIndex.value = resRegion.value.length - 1
  } else {
    Object.assign(resRegion.value[RegionIndex.value], deepCopy(editRegion))
  }
}

const onCloseRegion = () => {
  InitRegion()
}

// 删除某条区域
const onDeleteRegion = (index: number) => {
  InitRegion()
  resRegion.value.splice(index, 1)
  regionActiveList.value.splice(index, 1)
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

// 数据加载
onLoad(async () => {
  await getAddress_loading()
})
</script>

<template>
  <view class="system">
    <!-- 送餐地址设置 -->
    <view class="section address-section">
      <view class="section-title">送餐固定地址设置：</view>
      <view class="section-content">
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
        <view class="line" v-for="(item, index) in resRegion" :key="item.regionId">
          <view class="region">区域{{ index + 1 }}：{{ item.region }}</view>
        </view>
      </view>
      <view class="btn align-end" @click="onEditRegion">修改信息</view>
    </view>

    <!-- 送餐地址信息编辑 -->
    <uni-popup ref="addressPopup" type="dialog">
      <view class="popup-content">
        <view class="close-btn" @click="onCloseBtn"><i class="iconfont icon-x"></i></view>
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="wrapper">
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
              <view class="Randomly-btn btn" @click="onRandomly">点击随机生成</view>
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

    <!-- 商家区域信息编辑 -->
    <uni-popup ref="regionPopup" type="dialog">
      <view class="popup-content">
        <view class="close-btn" @click="onCloseBtn"><i class="iconfont icon-x"></i></view>
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="wrapper">
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
              <view class="btn popup-btn" @click="onComfirnRegion">确认编辑</view>
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
  </view>
</template>

<style lang="scss" scoped>
.system {
  width: 590rpx;
  height: 100%;
  font-size: 30rpx;
  padding: 30rpx 18rpx;
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
