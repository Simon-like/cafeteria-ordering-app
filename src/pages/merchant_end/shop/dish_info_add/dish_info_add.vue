<script lang="ts" setup>
import { useMerchantShopStore } from '@/stores'
import { ref } from 'vue'
import { addDish } from '@/services/merchant/merchant_shop_dish_api'
import { upload } from '@/utils/http'
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
// 新增一行规格
const onAddSpec = () => {
  MerchantShopStore.specifications.push('')
  specifications.value.push('')
}
const onCloseSpec = (index: number) => {
  MerchantShopStore.specifications.splice(index, 1)
  specifications.value.splice(index, 1)
}

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
        <view
          class="info-line"
          v-for="(item, index) in MerchantShopStore.specifications"
          :key="item"
        >
          <view class="line-title">规格{{ index + 1 }}:</view>
          <view class="dishSpec-box">
            <input
              type="text"
              class="dishSpec-input"
              v-model="specifications[index]"
              placeholder="请填写规格名称"
            />
            <view class="closeBtn" @click="onCloseSpec(index)"> 删除</view>
          </view>
        </view>
        <view class="info-line">
          <view class="spec-add" @click="onAddSpec"
            ><i class="iconfont icon-jia"></i><text>新增规格</text></view
          >
        </view>
      </view>
    </view>

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
