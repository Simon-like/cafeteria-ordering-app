<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useMerchantStore } from '@/stores'
import {
  GetMerchantInfo,
  ChangeMerchantInfo,
  updateMerchantOperationStatus,
} from '@/services/merchant/merchant_api'
import { upload } from '@/utils/http'
import { onLoad, onReady } from '@dcloudio/uni-app'
import type { MerchantInfo } from '@/types/merchant_return'

/**
 * @description 增加了图片上传功能，完善了营业时间的选择
 * @author 应东林  钟礼豪
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-26
 */
const Merchant = useMerchantStore()
const HandleGetInfo = async () => {
  const res = await GetMerchantInfo()
  Object.assign(Merchant, res.data)
  Merchant.operationStatus = res.data.operationStatus
  if (res.data.logo === null) {
    fileList1.value = []
  } else {
    fileList1.value.push({ url: res.data.logo })
  }
  let [time_start, time_end] = res.data.businessHours.split('-')
  Merchant.time_start = time_start
  Merchant.time_end = time_end
}

onLoad(HandleGetInfo)

const HandleUpdate = async () => {
  Merchant.operationStatus = Merchant.operationStatus === 0 ? 1 : 0
  updateMerchantOperationStatus(Merchant.id, Merchant.operationStatus)
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

function compareTime(time1: string, time2: string): number {
  // 将时间字符串分割成小时和分钟
  const [hours1, minutes1] = time1.split(':').map(Number)
  const [hours2, minutes2] = time2.split(':').map(Number)

  // 将时间转换为分钟进行比较
  const totalMinutes1 = hours1 * 60 + minutes1
  const totalMinutes2 = hours2 * 60 + minutes2

  // 比较并返回结果
  if (totalMinutes1 < totalMinutes2) {
    return -1 // time1 早于 time2
  } else if (totalMinutes1 > totalMinutes2) {
    return 1 // time1 晚于 time2
  } else {
    return 0 // time1 和 time2 相等
  }
}

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
        errorMessage: '请选择营业时间',
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
      if (compareTime(Merchant.time_start, Merchant.time_end) !== -1) {
        uni.showToast({
          icon: 'error',
          title: `营业时间填写错误！`,
        })
      } else {
        // 更新商户信息
        let changeData: MerchantInfo = reactive({
          name: valiFormData.name,
          address: valiFormData.address,
          contactPhone: valiFormData.contactPhone,
          realName: valiFormData.realName,
          discription: valiFormData.discription,
          logo: Merchant.logo,
          businessHours: Merchant.businessHours,
          operationStatus: Merchant.operationStatus,
          id: Merchant.id,
        })
        ChangeMerchantInfo(changeData)
          .then((res) => {
            uni.showToast({
              title: `修改成功`,
            })
            popup.value.close()
          })
          .catch((err) => {
            uni.showToast({
              title: `修改失败`,
            })
          })
      }
    })
    .catch((err: string) => {
      console.log('err', err)
    })
}
const logoPickerPopup = ref()
const fileList1 = ref<Object[]>([])

const openLogoPicker = () => {
  logoPickerPopup.value.open('center')
}

// 新增图片
const afterRead = async (event: Object) => {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file)
  lists.map((item) => {
    fileList1.value.push({
      ...item,
    })
  })
}

// 删除图片
const deletePic = (event: any) => {
  fileList1.value.splice(event.index, 1)
}

const uploadImg = async () => {
  for (let i = 0; i < fileList1.value.length; i++) {
    console.log(fileList1.value[i])
    const result = await upload('/merchant/uploadMerchantImage', fileList1.value[i].url)
    HandleGetInfo()
    uni.showToast({
      title: `图片修改成功！`,
    })
    logoPickerPopup.value.close()
  }
}

// 营业时间的修改
const time_start_show = ref<boolean>(false)
const time_end_show = ref<boolean>(false)
const time_edit = () => {
  valiFormData.businessHours = Merchant.businessHours =
    Merchant.time_start + ' - ' + Merchant.time_end
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
    <view class="opening-hours">营业时间:{{ Merchant.businessHours }}</view>
    <view class="owner">所有人: {{ Merchant.realName }}</view>
    <view class="store-introduction">
      <text>店铺简介: </text>
      <view class="description">
        {{ Merchant.discription }}
      </view>
    </view>
    <view class="Operation">
      <label>
        <checkbox :checked="!Merchant.operationStatus" @click="HandleUpdate()" /><text
          >是否营业</text
        >
      </label>
    </view>

    <view class="edit-button" @click="onEdit"> 修改资料 </view>

    <uni-popup ref="logoPickerPopup" type="bottom" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section title="修改店铺logo" type="line">
          <up-upload
            :fileList="fileList1"
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

    <uni-popup ref="popup" type="dialog" border-radius="10px 10px 0 0" @change="HandleGetInfo()">
      <uni-card class="form-card">
        <uni-section title="修改资料" type="line">
          <scroll-view scroll-y="true" class="scroll-Y">
            <view class="form-wrapper">
              <!-- 基础表单 -->
              <uni-forms
                ref="valiForm"
                :modelValue="valiFormData"
                label-align="right"
                :rules="rules"
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
                  <view class="picker">
                    <up-datetime-picker
                      hasInput
                      :show="time_start_show"
                      v-model="Merchant.time_start"
                      format="HH:mm"
                      mode="time"
                      @confirm="time_edit"
                    ></up-datetime-picker>
                    -
                    <up-datetime-picker
                      hasInput
                      :show="time_end_show"
                      v-model="Merchant.time_end"
                      format=":mm"
                      mode="time"
                      @confirm="time_edit"
                    ></up-datetime-picker>
                  </view>
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
    .form-wrapper {
      :deep() {
        text {
          font-size: 30rpx;
          margin-right: 30rpx;
        }

        .picker {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5rpx;
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
.upload-button {
  margin: 50rpx auto;
  background-color: #fff;
}
</style>
