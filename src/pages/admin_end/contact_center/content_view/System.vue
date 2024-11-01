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

// 送餐地址设置

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
// 当前选中的索引值
const AdressIndex = ref<number>(0)
const editAdress = reactive<AdressItem>(deepCopy(resAdress.value[AdressIndex.value]))

const adressPopup = ref()

const adressActiveList = ref<boolean[]>(new Array(resAdress.value.length).fill(false))
const onChosseAdressLine = (index: number) => {
  adressActiveList.value.fill(false)
  adressActiveList.value[index] = true
  Object.assign(editAdress, resAdress.value[index])
  AdressIndex.value = index
}

// 初始化参数
const InitAdress = () => {
  AdressIndex.value = 0
  Object.assign(editAdress, { adressId: -1, adressNumber: '', adress: '', DeliveryPrice: 0 })
  adressActiveList.value.fill(false)
}

const onEditAdress = () => {
  adressActiveList.value.fill(false)
  adressActiveList.value[0] = true
  Object.assign(editAdress, deepCopy(resAdress.value[0]))
  adressPopup.value.open('center')
}

//随机生成编号事件
const onRandomly = () => {
  editAdress.adressNumber = generateUniqueId(resAdress.value.map((item) => item.adressNumber))
}

//修改送餐地址
const onComfirnAdress = () => {
  Object.assign(resAdress.value[AdressIndex.value], deepCopy(editAdress))
}

// 删除某地址
const onDeleteAdress = (index: number) => {
  InitAdress()
}

//商家区域设置
const resRegion = ref([
  { region: '学子', regionId: 213 },
  { region: '学苑', regionId: 213 },
])
const onEditRegion = () => {}
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
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="wrapper">
            <view
              class="line"
              v-for="(item, index) in resAdress"
              :key="item.adressId"
              :class="{ active: adressActiveList[index] }"
              @click="onChosseAdressLine(index)"
            >
              <view class="title">地址{{ index + 1 }}:{{ item.adress }}</view>
              <view class="DeliveryPrice">配送费:{{ item.DeliveryPrice }}</view>
              <view class="adress-number"
                >编号:{{ item.adressNumber
                }}<i class="iconfont icon-jianhao" @click="onDeleteAdress(index)"></i
              ></view>
            </view>
            <view class="line add-line" style="justify-content: flex-start">
              <view><i class="iconfont icon-jiahao"></i>地址{{ resAdress.length + 1 }}</view>
            </view>
          </view>
          <view class="wrapper add-wrapper">
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
              <view class="btn" @click="onRandomly">点击随机生成</view>
            </view>
            <view class="line btn-line">
              <view class="btn popup-btn" @click="onComfirnAdress">确认</view>
              <view class="btn popup-btn">取消</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scope>
.system {
  width: 610rpx;
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
    &.active {
      background: rgba(139, 209, 0, 0.3);
    }
  }
  .btn {
    padding: 6rpx 35rpx;
    background: rgba(0, 0, 0, 0.2);
    font-weight: 550;
    text-align: center;
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

  .section {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20rpx;
    font-size: 30rpx;
    margin-bottom: 30rpx;
    background: rgba(0, 0, 0, 0.1);
    padding: 20rpx;
    .section-title {
      font-weight: 550;
      font-size: 32rpx;
      align-self: flex-start;
    }
    .section-content {
      width: 100%;
      padding: 15rpx;
      background: rgba(0, 0, 0, 0.2);
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
    width: 600rpx;
    height: 800rpx;
    border: 1px solid #000;
    padding: 50rpx 26rpx;
    background: #fff;
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
      }

      &.add-wrapper {
        background: rgba(0, 0, 0, 0.2);
        padding: 10rpx;

        .line {
          justify-content: space-between;
        }
        .btn-line {
          justify-content: center;
          gap: 45rpx;
          .popup-btn {
            border: 1px solid #000;
            background: #fff;
            width: 160rpx;
          }
        }
      }
    }
  }
}
</style>
