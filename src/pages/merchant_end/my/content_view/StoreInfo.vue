<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useMerchantStore } from '@/stores/modules/merchant_information'
import {
  GetMerchantInfo,
  ChangeMerchantInfo,
  updateMerchantOperationStatus,
} from '@/services/merchant/merchant_api'
import { onLoad } from '@dcloudio/uni-app'
import type { MerchantInfo } from '@/types/merchant_return'

/**
 * @description 个人中心页面数据的替换，通过pinia仓库进行数据管理
 * @author 应东林  钟礼豪
 * @date 2024-09-19
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-09-19
 */
const Merchant = useMerchantStore()
const HandleGetInfo = async () => {
  const res = await GetMerchantInfo()
  Object.assign(Merchant, res.data)
  Merchant.operationStatus = '1'
}

onLoad(HandleGetInfo)

const HandleUpdate = async () => {
  console.log('nowStatus:', Merchant.operationStatus)
  updateMerchantOperationStatus(Merchant.id, Merchant.operationStatus)
  if (Merchant.operationStatus === '1') Merchant.operationStatus = '0'
  else Merchant.operationStatus = '1'
  console.log('changedStatus:', Merchant.operationStatus)
}

const popup = ref()
const valiForm = ref<UniHelper.FormInstance>()
const onEdit = () => {
  valiFormData.name = Merchant.name
  valiFormData.address = Merchant.address
  valiFormData.contactPhone = Merchant.contactPhone
  valiFormData.businessHours = Merchant.businessHours
  valiFormData.realName = Merchant.realName
  valiFormData.discription = Merchant.discription
  popup.value.open('center')
}

const close = () => {
  popup.value.close()
} //对话框取消按钮

const confirm = () => {
  popup.value.close()
} //对话框确认按钮

const rules = {
  name: {
    rules: [
      {
        required: true,
        errorMessage: '名称不能为空',
      },
    ],
  },
  address: {
    rules: [
      {
        required: true,
        errorMessage: '地址不能为空',
      },
    ],
  },
  businessHours: {
    rules: [
      {
        required: true,
        errorMessage: '营业时间不能为空',
      },
    ],
  },
  realName: {
    rules: [
      {
        required: true,
        errorMessage: '所有人不能为空',
      },
    ],
  },
  contactPhone: {
    rules: [
      {
        required: true,
        errorMessage: '联系电话不能为空',
      },
    ],
  },
}

// 校验表单数据
const valiFormData = reactive({
  name: '',
  address: '',
  contactPhone: '',
  businessHours: '',
  realName: '',
  discription: '',
})

const submit = () => {
  valiForm.value
    ?.validate()
    .then((res: string) => {
      console.log(res)
      // 更新商户信息
      let changeData: MerchantInfo = reactive({
        name: valiFormData.name,
        address: valiFormData.address,
        contactPhone: valiFormData.contactPhone,
        realName: valiFormData.realName,
        discription: valiFormData.discription,
        logo: '',
        businessHours: valiFormData.businessHours,
        operationStatus: Merchant.operationStatus,
        id: Merchant.id,
      })
      ChangeMerchantInfo(changeData)
        .then((res) => {
          uni.showToast({
            title: `修改成功`,
          })
          popup.value.close()
          HandleGetInfo()
        })
        .catch((err) => {
          uni.showToast({
            title: `修改失败`,
          })
        })
    })
    .catch((err: string) => {
      console.log('err', err)
    })
}
const logoPickerPopup = ref()

const openLogoPicker = () => {
  logoPickerPopup.value.open('center')
}

const submitLogo = (logoPath: string) => {
  Merchant.logo = logoPath
  logoPickerPopup.value.close()
  // 这里可以添加上传logo到服务器的代码
}
</script>

<template>
  <view class="store-info">
    <view class="store-logo">
      <text>店铺logo:</text>
      <image :src="Merchant.logo" mode="aspectFill" class="logo" @click="openLogoPicker()"></image>
    </view>
    <view class="store-name">店铺名称: {{ Merchant.name }}</view>
    <view class="store-address">店铺地址: {{ Merchant.address }}</view>
    <view class="contact-number">联系电话: {{ Merchant.contactPhone }}</view>
    <view class="opening-hours">营业时间: {{ Merchant.businessHours }}</view>
    <view class="owner">所有人: {{ Merchant.realName }}</view>
    <view class="store-introduction">
      <text>店铺简介: </text>
      <view class="description">
        {{ Merchant.discription }}
      </view>
    </view>
    <view class="Operation">
      <label> <checkbox @click="HandleUpdate()" /><text>是否营业</text> </label>
    </view>

    <view class="edit-button" @click="onEdit"> 修改资料 </view>

    <uni-popup ref="logoPickerPopup" type="bottom" border-radius="10px 10px 0 0">
      <view class="picker-container">
        <uni-file-picker
          limit="1"
          title="从相册选图"
          @change="submitLogo"
          :source-type="['album']"
        ></uni-file-picker>
        <uni-file-picker
          limit="1"
          title="使用相机"
          @change="submitLogo"
          :source-type="['camera']"
        ></uni-file-picker
        ><view class="submit-button" @click="submitLogo('123')"> 提交 </view>
      </view>
    </uni-popup>

    <uni-popup ref="popup" type="dialog" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section title="修改资料" type="line">
          <scroll-view scroll-y="true" class="scroll-Y">
            <view class="form-wrapper">
              <!-- 基础表单 -->
              <uni-forms
                ref="valiForm"
                :rules="rules"
                :modelValue="valiFormData"
                label-align="right"
              >
                <uni-forms-item required name="name">
                  <template #label><text>店铺名称</text></template>
                  <uni-easyinput v-model="valiFormData.name" placeholder="请输入店铺名称" />
                </uni-forms-item>
                <uni-forms-item required name="address">
                  <template #label><text>店铺地址</text></template>
                  <uni-easyinput v-model="valiFormData.address" placeholder="请输入店铺地址" />
                </uni-forms-item>
                <uni-forms-item required name="number">
                  <template #label><text>联系电话</text></template>
                  <uni-easyinput v-model="valiFormData.contactPhone" placeholder="请输入联系电话" />
                </uni-forms-item>
                <uni-forms-item required name="hours">
                  <template #label><text>营业时间</text></template>
                  <uni-easyinput
                    v-model="valiFormData.businessHours"
                    placeholder="请输入营业时间"
                  />
                </uni-forms-item>
                <uni-forms-item required name="owner">
                  <template #label><text>所有人</text></template>
                  <uni-easyinput v-model="valiFormData.realName" placeholder="请输入所有人" />
                </uni-forms-item>
                <uni-forms-item name="introduction">
                  <template #label><text>店铺简介</text></template>
                  <uni-easyinput
                    type="textarea"
                    v-model="valiFormData.discription"
                    placeholder="请输入店铺简介"
                  />
                </uni-forms-item>
              </uni-forms>
              <view class="submit-button" @click="submit"> 提交 </view>
            </view>
          </scroll-view>
        </uni-section>
      </uni-card>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.store-info {
  width: 610rpx;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 26rpx;
  gap: 36rpx;
  padding: 20rpx 16rpx;
  font-size: 30rpx;

  .store-logo {
    display: flex;
    gap: 26rpx;
    .logo {
      width: 170rpx;
      height: 170rpx;
      border: 2px solid rgba(0, 0, 0, 0.5);
    }
  }

  .edit-button {
    margin: 0 auto;
    margin-top: 46rpx;
    width: 166rpx;
    height: 46rpx;
    background-color: rgba(126, 126, 94, 0.7);
    line-height: 44rpx;
    text-align: center;
    transition: all 0.2s ease;

    &:active {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }

  .form-card {
    width: 700rpx;
    .scroll-Y {
      height: 500rpx;
    }
    .form-wrapper {
      :deep() {
        text {
          font-size: 30rpx;
          margin-right: 30rpx;
        }
        .submit-button {
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
    }
  }
}
.picker-container {
  padding: 50rpx 40rpx;
  width: 600rpx;
  height: 750rpx;
  background-color: #fff;
  .submit-button {
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
</style>
