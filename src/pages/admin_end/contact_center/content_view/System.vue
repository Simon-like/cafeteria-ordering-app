<script lang="ts" setup>
import { ref, nextTick, reactive } from 'vue'
import type { AdressItem, ColleagueItem } from '@/types/admin_return'
import { debounce, splitContent, deepCopy } from '@/composables/tools'
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

const resAdress = ref<AdressItem[]>([
  { adressId: 10, adressNumber: 'A8', adress: '11公寓', DeliveryPrice: 75.5 },
  { adressId: 12, adressNumber: 'A7', adress: '15公寓', DeliveryPrice: 75.5 },
  { adressId: 13, adressNumber: 'A45', adress: '17公寓', DeliveryPrice: 75.5 },
  { adressId: 15, adressNumber: 'A3', adress: '18公寓', DeliveryPrice: 75.5 },
])
// 当前选中的索引值，-1表示当前无地址选择，-2表示处于新增地址状态
const AdressIndex = ref<number>(0)
const editAdress = reactive<AdressItem>({
  adressId: -1,
  adressNumber: '',
  adress: '',
  DeliveryPrice: 0,
})

const adressPopup = ref()

const adressActiveList = ref<boolean[]>(new Array(resAdress.value.length).fill(false))

// 编辑某地址
const onEditAdress = () => {
  if (resAdress.value.length === 0) {
    AdressIndex.value = -1
  } else {
    adressActiveList.value.fill(false)
    adressActiveList.value[0] = true
    Object.assign(editAdress, deepCopy(resAdress.value[0]))
  }
  adressPopup.value.open('center')
}

// 选择某条地址
const onChosseAdressLine = (index: number) => {
  adressActiveList.value.fill(false)
  adressActiveList.value[index] = true
  Object.assign(editAdress, resAdress.value[index])
  AdressIndex.value = index
}

// 初始化参数
const InitAdress = () => {
  AdressIndex.value = -1
  Object.assign(editAdress, { adressId: -1, adressNumber: '', adress: '', DeliveryPrice: 0 })
  adressActiveList.value.fill(false)
}

//随机生成编号事件
const onRandomly = () => {
  editAdress.adressNumber = generateUniqueId(resAdress.value.map((item) => item.adressNumber))
}

//修改送餐地址
const onComfirnAdress = () => {
  if (AdressIndex.value === -2) {
    //保存新增地址信息
    resAdress.value.push(deepCopy(editAdress))
    adressActiveList.value.push(true)
    AdressIndex.value = resAdress.value.length - 1
  } else {
    Object.assign(resAdress.value[AdressIndex.value], deepCopy(editAdress))
  }
}

// 删除某地址
const onDeleteAdress = (index: number) => {
  InitAdress()
  resAdress.value.splice(index, 1)
  adressActiveList.value.splice(index, 1)
}

// 取消地址编辑
const onCloseAdress = () => {
  InitAdress()
}

// 新增一个地址
const onAddAdress = () => {
  AdressIndex.value = -2
  adressActiveList.value.fill(false)
  Object.assign(editAdress, { adressId: -1, adressNumber: '', adress: '', DeliveryPrice: 0 })
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
  adressPopup.value.close()
  regionPopup.value.close()
}
const onCloseBtn = () => {
  adressPopup.value.close()
  regionPopup.value.close()
}
</script>

<template>
  <view class="system">
    <!-- 送餐地址设置 -->
    <view class="section adress-section">
      <view class="section-title">送餐固定地址设置：</view>
      <view class="section-content">
        <view class="line" v-for="(item, index) in resAdress" :key="item.adressId">
          <view class="adress">地址{{ index + 1 }}:{{ item.adress }}</view>
          <view class="delivery-price">配送费：{{ item.DeliveryPrice }}</view>
          <view class="adress-number">编号：{{ item.adressNumber }}</view>
        </view>
      </view>
      <view class="btn align-end" @click="onEditAdress">修改信息</view>
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
    <uni-popup ref="adressPopup" type="dialog">
      <view class="popup-content">
        <view class="close-btn" @click="onCloseBtn"><i class="iconfont icon-x"></i></view>
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="wrapper">
            <view class="line" v-for="(item, index) in resAdress" :key="item.adressId">
              <view
                class="y-wrapper"
                :class="{ active: adressActiveList[index] }"
                @click="onChosseAdressLine(index)"
              >
                <view class="title"
                  ><text>地址{{ index + 1 }}:</text>{{ item.adress }}</view
                >
                <view class="x-wrapper">
                  <view class="DeliveryPrice">配送费:{{ item.DeliveryPrice }}</view>
                  <view class="adress-number">编号:{{ item.adressNumber }}</view>
                </view>
              </view>
              <view @click="onDeleteAdress(index)"><i class="iconfont icon-jianhao"></i></view>
            </view>
            <view class="line add-line" style="justify-content: flex-start">
              <view
                class="add-adress-line"
                @click="onAddAdress"
                :class="{ active: AdressIndex === -2 }"
                ><i class="iconfont icon-jiahao"></i>新增地址</view
              >
            </view>
          </view>

          <!-- /修改框 -->
          <view class="wrapper add-wrapper" v-show="AdressIndex !== -1">
            <view class="line">
              <view class="title"
                >{{ AdressIndex === -2 ? '新增地址' : `地址${AdressIndex + 1}` }}：</view
              >
            </view>
            <view class="line">
              <view class="title">名称：</view>
              <uni-easyinput v-model="editAdress.adress" placeholder="请输入地址名称" />
            </view>
            <view class="line">
              <view class="title">配送费：</view>
              <uni-easyinput
                v-model="editAdress.DeliveryPrice"
                placeholder="请输入配送费"
                type="number"
              />
            </view>
            <view class="line">
              <view class="title">编号：{{ editAdress.adressNumber }}</view>
              <view class="Randomly-btn btn" @click="onRandomly">点击随机生成</view>
            </view>
            <view class="line btn-line">
              <view class="btn popup-confirm-btn" @click="onComfirnAdress">确认编辑</view>
              <view class="btn popup-close-btn" @click="onCloseAdress">取消编辑</view>
            </view>
          </view>

          <view class="wrapper add-wrapper" v-show="AdressIndex === -1">
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

<style lang="scss" scope>
.system {
  width: 590rpx;
  height: 100%;
  font-size: 30rpx;
  padding: 30rpx 18rpx;
  .line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15rpx;
    transition: all 0.2s ease-in;
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

  .adress-section {
    .adress {
      font-weight: 550;
    }
    .delivery-price,
    .adress-number {
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

    .add-adress-line,
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
