<script lang="ts" setup>
import { useMerchantShopStore } from '@/stores'
import { ref } from 'vue'
import { addDish } from '@/services/merchant/merchant_shop_dish_api'
import { upload } from '@/utils/http'
import { debounce, deepCopy } from '@/composables/tools'
import type { categoryType, dishData, specItem, specOptionsItem } from '@/types/merchant_return'

/**
 * @description 新增菜品信息页面
 * @author 应东林
 * @date 2024-09-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-02
 */
const MerchantShopStore = useMerchantShopStore()

const back = () => {
  MerchantShopStore.initializeDishInfo()
  uni.reLaunch({
    url: '/pages/merchant_end/merchant_index',
  })
}

const priceMinus = () => {
  if (MerchantShopStore.price === 0) {
    uni.showToast({
      icon: 'none',
      title: '数量已经达到最小值',
    })
  } else {
    MerchantShopStore.price--
  }
}
const priceAdd = () => {
  MerchantShopStore.price++
}

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
    MerchantShopStore.imageUrl = extractHttpLink(result.data) as string
    console.log(MerchantShopStore.imageUrl)
    uni.showToast({
      title: `图片修改成功！`,
    })
    logoPickerPopup.value.close()
  }
}

// 很奇怪，要单独列一个变量
const specifications = ref<string[]>([])
// // 新增一行规格
// const onAddSpec = () => {
//   MerchantShopStore.specifications.push('')
//   specifications.value.push('')
// }
// const onCloseSpec = (index: number) => {
//   MerchantShopStore.specifications.splice(index, 1)
//   specifications.value.splice(index, 1)
// }

// 提交新增菜品信息
const onAddDish = async () => {
  if (
    !MerchantShopStore.imageUrl ||
    !MerchantShopStore.price ||
    !MerchantShopStore.dishName ||
    !MerchantShopStore.dishDescription ||
    !MerchantShopStore.description
  ) {
    uni.showToast({
      icon: 'none',
      title: '请检查所填信息是否均已填写完毕！',
    })
    return
  }

  MerchantShopStore.specifications = specifications.value.filter((item) => item !== '')
  const res = await addDish(
    MerchantShopStore.description,
    MerchantShopStore.dishDescription,
    MerchantShopStore.dishName,
    MerchantShopStore.price,
    MerchantShopStore.specifications,
    MerchantShopStore.imageUrl,
  )
  if (+res.code === 1) {
    uni.showToast({
      icon: 'none',
      title: '成功发送菜品信息，请等待管理员审核',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '菜品信息发送失败',
    })
  }
}

// 修改后的规格信息

const specList = ref<specItem[]>([])

let specValue = ref<specItem>({
  specTitle: '',
  isEssential: false,
  specId: -1,
  specOptions: [],
})

// // 很奇怪，要单独列一个变量
const OptionsList = ref<string[]>([])

//新增规格
const onAddSpec = () => {
  specList.value.push({
    specTitle: '',
    isEssential: false,
    specId: -1,
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
  specValue.value.specOptions.forEach((item) => OptionsList.value.push(item.OptionsName))
  specIndex.value = index
}

// 保存规格
const onSpecOptionSave = () => {
  OptionsList.value.forEach((item, index) => {
    specValue.value.specOptions[index].OptionsName = item
  })
  if (specValue.value.specOptions.find((item) => !item.OptionsName)) {
    uni.showToast({
      icon: 'none',
      title: '不允许出现空的规格选项！\n请仔细检查',
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
    OptionsName: '',
    specPrice: 0,
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
  if (specList.value[specIndex.value].specId != -1)
    deleteSpecIDList.value.push(specList.value[specIndex.value].specId)
  specList.value.splice(specIndex.value, 1)
  specDeletePopup.value.close()
  specPopup.value.close()
}

const onCheck = (index: number) => {
  if (specValue.value.specOptions[index].specPrice < 0) {
    specValue.value.specOptions[index].specPrice = 0
    uni.showToast({
      icon: 'none',
      title: '附加价值不允许为负值',
    })
  }
}
</script>

<template>
  <view class="add-view">
    <custom-nav-bar></custom-nav-bar>
    <view class="section-header">
      <view class="title">新增菜品</view>
      <view class="back-btn" @click="back"><i class="iconfont icon-zuojiantou"></i></view>
    </view>
    <view class="basic-info section">
      <view class="section-title">基本信息</view>
      <view class="info-wrapper">
        <view class="info-line">
          <view class="line-title">封面：</view>
          <image
            :src="MerchantShopStore.imageUrl"
            mode="aspectFill"
            class="logo"
            @click="openLogoPicker()"
          ></image>
        </view>
        <view class="info-line">
          <view class="line-title">菜品名称：</view>
          <input
            type="text"
            class="dishName-input"
            v-model="MerchantShopStore.dishName"
            placeholder="请填写菜品名称"
          />
        </view>
        <view class="info-line">
          <view class="line-title">菜品定价：</view>
          <view class="value">
            <view class="value number">
              <view class="minus" @click="priceMinus">-</view>
              <input type="number" class="inventory-input" v-model="MerchantShopStore.price" />
              <view class="add" @click="priceAdd">+</view>
            </view>
          </view>
        </view>
        <view class="info-line">
          <view class="line-title">菜品描述：</view>
        </view>
        <uni-easyinput
          type="textarea"
          v-model="MerchantShopStore.dishDescription"
          autoHeight
          placeholder="请描述该菜品的特征,用后续商品的展示"
          :styles="{
            color: '#000',
            borderColor: '#7e7e5e',
            borderRadius: '20px',
            backgroundColor: 'rgba(255,255,255,0.4)',
          }"
          :placeholderStyle="'color:rgba(0, 0, 0, 0.5);font-size:14px'"
        ></uni-easyinput>
        <view class="info-line">
          <view class="line-title">附言：</view>
        </view>
        <uni-easyinput
          type="textarea"
          v-model="MerchantShopStore.description"
          autoHeight
          placeholder="此处填写需要额外说明的内容,便于管理员审核"
          :styles="{
            color: '#000',
            borderColor: '#7e7e5e',
            borderRadius: '20px',
            backgroundColor: 'rgba(255,255,255,0.4)',
          }"
          :placeholderStyle="'color:rgba(0, 0, 0, 0.5);font-size:14px'"
        ></uni-easyinput>
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

    <uni-popup ref="specPopup" type="dialog" border-radius="10px 10px 0 0">
      <view class="specWrapper">
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="headerTitle">
            <view class="header-specName">规格</view>
            <view class="close-spec-btn" @click="onDeleteSpec">删除这条规格</view>
          </view>
          <view class="specTitle box">
            <view class="title">名称：</view>
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
            <view clas="specOptions-title"><text>选项列表:</text></view>
            <view
              class="line"
              v-for="(item, index) in specValue.specOptions"
              :key="item.OptionsName"
            >
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
                  v-model="item.specPrice"
                  @input="onCheck(index)"
                />
              </view>
              <view class="closeBtn" @click="onCloseSpec(index)"> 删除</view>
            </view>
            <view class="line">
              <view class="spec-add" @click="onAddSpecOptions"
                ><i class="iconfont icon-jia"></i><text>新增选项</text></view
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
            <view class="save-btn" @click="onSpecOptionSave">保存</view>
            <view class="save-btn" @click="onClose">取消</view>
          </view>
        </scroll-view>
      </view>
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

    <view class="button-box">
      <view class="upload btn" @click="onAddDish">提交</view>
    </view>
  </view>
</template>

<style lang="scss" scope>
.add-view {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45rpx 20rpx 0 20rpx;
  gap: 60rpx;

  .specWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 45rpx 20rpx 0rpx 20rpx;
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
      }
      .close-spec-btn {
        color: #f94204;
        padding: 5rpx;
        font-size: 30rpx;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.6);
        transition: 0.2s ease;
        &:active {
          scale: 0.95;
        }
      }
    }
    .box {
      white-space: nowrap;
      width: 100%;
      padding: 14rpx 14rpx 20rpx 14rpx;
      background: rgba(0, 0, 0, 0.2);
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
          border: 1px solid rgba(0, 0, 0, 0.6);
          width: 300rpx;
          padding: 5rpx;
          font-size: 30rpx;
          outline: none;
          height: 100%;
          background: transparent;
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
          background-color: #fff;
          transition: 0.2s ease;
          &:active {
            scale: 0.95;
          }
          i {
            color: rgba(0, 0, 0, 0.3);
            margin-right: 5rpx;
          }
        }
        .dishSpec-input {
          width: 150rpx;
          border: 1px solid rgba(0, 0, 0, 0.6);
          padding: 5rpx;
          font-size: 30rpx;
          outline: none;
          height: 100%;
          background: transparent;
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
            color: rgba(0, 0, 0, 0.3);
            font-weight: blod;
            background-color: #fff;
            transition: 0.2s ease;
            &:active {
              scale: 0.95;
            }
          }
          .specNumber-input {
            outline: none;
            width: 80rpx;
            background: transparent;
            border-bottom: 1px solid #fff;
            text-align: center;
          }
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
            background: #14f00b;
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
        background: rgba(0, 0, 0, 0.2);
        color: #000;
        text-align: center;
        font-weight: 550;
        transition: 0.2s ease;
        &:active {
          scale: 0.9;
        }
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
      background-color: rgba(0, 0, 0, 0.2);
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
      background-color: rgba(0, 0, 0, 0.1);
      gap: 40rpx;
      padding: 30rpx;
      .info-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .spec-add {
          padding: 5rpx;
          text-align: center;
          border-radius: 16rpx;
          background-color: #fff;
          transition: 0.2s ease;
          &:active {
            scale: 0.95;
          }
          i {
            color: rgba(0, 0, 0, 0.3);
            margin-right: 5rpx;
          }
        }

        .logo {
          width: 170rpx;
          height: 170rpx;
          border: 2px solid rgba(0, 0, 0, 0.5);
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

        .dishName-input {
          border: 1px solid rgba(0, 0, 0, 0.6);
          width: 300rpx;
          padding: 5rpx;
          font-size: 30rpx;
          outline: none;
          background: transparent;
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
            color: rgba(0, 0, 0, 0.3);
            font-weight: blod;
            background-color: #fff;
            transition: 0.2s ease;
            &:active {
              scale: 0.95;
            }
          }
          input {
            outline: none;
            width: 80rpx;
            background: transparent;
            border-bottom: 1px solid #fff;
            text-align: center;
          }
        }
      }
    }
  }
  .form-card {
    width: 700rpx;
    .scroll-Y {
      height: 500rpx;
    }

    .img-picker {
      margin: 0 auto;
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

    .uploadBtn {
      margin: 0 auto;
      margin-top: 46rpx;
      width: 300rpx;
      height: 60rpx;
      line-height: 60rpx;
      background-color: rgba(126, 126, 94, 0.7);
      text-align: center;
      transition: all 0.2s ease;
      &:active {
        opacity: 0.8;
        transform: scale(0.95);
      }
    }
  }

  .button-box {
    margin-top: 90rpx;
    width: 100%;
    display: flex;
    gap: 70rpx;
    justify-content: space-between;
    align-items: center;
    .btn {
      height: 80rpx;
      flex: 1;
      font-size: 45rpx;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 16rpx;
      font-weight: 550;
      transition: 0.2s ease;
      text-align: center;
      line-height: 80rpx;
      &:active {
        scale: 0.9;
      }
    }
  }
}
</style>
