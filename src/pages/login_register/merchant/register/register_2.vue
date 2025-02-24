<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { useMerchantStore } from '@/stores'
import { GetUniversity, GetRegion } from '@/services/merchant/merchant_api'
import { upload } from '@/utils/http'
import { onLoad } from '@dcloudio/uni-app'

import type { University } from '@/types/merchant_return'

const realName = ref<string>('')
const name = ref<string>('')
const address = ref<string>('')
const detailedAddress = ref<string>('')
const college = ref<string>('')
const merchantStore = useMerchantStore()

const gotoNext = () => {
  if (
    !!merchantStore.realName &&
    !!merchantStore.name &&
    !!merchantStore.detailedAddress &&
    !!merchantStore.collegeId &&
    !!merchantStore.address
  ) {
    uni.navigateTo({
      url: '/pages/login_register/merchant/register/register_3',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: `请填写完全部数据！`,
    })
  }
}

// 改为数组类型以存储大学列表
const universities = ref<University[]>([])

// 获取大学列表的函数
const fetchUniversities = async () => {
  try {
    const res = await GetUniversity()
    if (res.data && res.data.UniversityList) {
      universities.value = res.data.UniversityList
      console.log(universities.value)
    }
  } catch (error) {
    console.error('获取大学列表失败', error)
  }
}
// 计算属性，提取大学名称
const universityNames = computed(() => {
  return universities.value.map((university) => university.collegeName)
})
// 在页面加载时调用获取大学列表的函数
onLoad(() => {
  fetchUniversities()
})

// 当选择大学时触发的函数
const onUniversityChange = (e) => {
  merchantStore.address = ''
  merchantStore.addressId = ''
  const index = e.detail.value
  if (universities.value[index]) {
    const selectedUniversity = universities.value[index]
    // 存储选中的大学 ID 和名称到 Pinia 仓库
    merchantStore.collegeId = selectedUniversity.collegeId
    merchantStore.collegeName = selectedUniversity.collegeName
    college.value = selectedUniversity.collegeName // 更新显示的大学名称
    console.log(merchantStore.collegeId, merchantStore.collegeName)
  }
}

const place_show = ref<boolean>(false)
const place_PickerRef = ref(null)
const place_columns = reactive([[]])
const resRegion = ref<{ regionId: number; region: string }[]>([])
const selectedRegion = ref('')
// 获取区域信息
const fetchRegion = async () => {
  if (merchantStore.collegeId) {
    const res = await GetRegion(merchantStore.collegeId)
    if (res.code === 1) {
      place_columns[0] = res.data
      place_show.value = true
    } else {
      uni.showToast({
        icon: 'none',
        title: '请求区域信息失败',
      })
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: '未选择大学！',
    })
    return
  }
}

//选择某个区域
const place_confirm = (e: any) => {
  console.log(e.value[0])
  merchantStore.address = e.value[0].region
  merchantStore.addressId = e.value[0].regionId
  place_show.value = false
}

// 营业时间的修改
const time_start_show = ref<boolean>(false)
const time_end_show = ref<boolean>(false)
const time_edit = () => {
  merchantStore.businessHours = merchantStore.time_start + ' - ' + merchantStore.time_end
}

//上传图片
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
    const result = await upload('/common/uploadImage', fileList1.value[i].url)
    let data = JSON.parse(result.data)
    if (result.statusCode === 200 && data.code === 1) {
      merchantStore.logo = data.data
      uni.showToast({
        title: `图片上传成功！`,
      })
    } else {
      uni.showToast({
        title: `图片上传失败！`,
      })
    }
    logoPickerPopup.value.close()
  }
}
</script>

<template>
  <view class="body">
    <view class="title"> 注册 </view>
    <view class="nav">
      <view class="nav-item">
        <view class="circle line"> 1 </view>
        <text>注册账户</text>
      </view>
      <view class="nav-item">
        <view class="circle line" id="active"> 2 </view>
        <text>门店信息</text>
      </view>
      <view class="nav-item">
        <view class="circle"> 3 </view>
        <text>资质审核</text>
      </view>
    </view>
    <view class="input">
      <view class="input-item">
        <text>所有人姓名</text>
        <input type="text" v-model="merchantStore.realName" />
      </view>
      <view class="input-item">
        <text>店铺名称</text>
        <input type="text" v-model="merchantStore.name" />
      </view>
      <view class="input-item">
        <text>选择大学</text>
        <picker class="uni" mode="selector" :range="universityNames" @change="onUniversityChange"
          ><view class="uni-text">{{ merchantStore.collegeName || '请选择大学' }}</view>
          <!-- 显示选择的大学 -->
        </picker>
      </view>
      <view class="input-item">
        <text>选择店铺区域</text>
        <view class="place-box" @click="fetchRegion">{{
          merchantStore.address || '请选择店铺区域'
        }}</view>
      </view>
      <up-picker
        :show="place_show"
        :columns="place_columns"
        keyName="region"
        ref="place_PickerRef"
        @confirm="place_confirm"
        @cancel="place_show = false"
      ></up-picker>

      <view class="input-item">
        <text>店铺详细地址</text>
        <input type="text" v-model="merchantStore.detailedAddress" />
      </view>

      <view class="input-item">
        <text>店铺联系电话</text>
        <input type="text" v-model="merchantStore.contactPhone" />
      </view>

      <view class="input-item">
        <text>营业时间</text>
        <view class="picker">
          <up-datetime-picker
            hasInput
            :show="time_start_show"
            v-model="merchantStore.time_start"
            format="HH:mm"
            mode="time"
            @confirm="time_edit"
          ></up-datetime-picker>
          -
          <up-datetime-picker
            hasInput
            :show="time_end_show"
            v-model="merchantStore.time_end"
            format="HH:mm"
            mode="time"
            @confirm="time_edit"
          ></up-datetime-picker>
        </view>
      </view>

      <view class="input-item description">
        <text>店铺简介</text>
        <uni-easyinput
          type="textarea"
          v-model="merchantStore.discription"
          placeholder="请输入店铺简介"
          autoHeight
        />
      </view>
      <view class="input-item">
        <text>店铺logo</text>
        <image
          :src="merchantStore.logo"
          mode="aspectFill"
          class="logo"
          @click="openLogoPicker()"
        ></image>
      </view>
    </view>

    <uni-popup ref="logoPickerPopup" type="bottom" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section
          title="修改店铺logo"
          type="line"
          titleColor="$bg-color-dark"
          titleFontSize="26rpx"
        >
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

    <text class="tips">--店铺详细信息注册完成后可在门店管理页面中更改--</text>
    <button @click="gotoNext()">下一步</button>
  </view>
</template>

<style lang="scss" scoped>
.title {
  font-size: 68rpx;
  margin: 20rpx auto;
  margin-left: 320rpx;
  margin-bottom: 40rpx;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-item {
    margin-left: 50rpx;
    position: relative;
    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      background-color: #ecf8ec;
      margin-left: 42rpx;
      margin-bottom: 20rpx;
    }
    #active {
      background-image: linear-gradient(180deg, #6ce867 -14.29%, #c1fec1 105.36%);
    }
  }
}
.circle.line {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: -170rpx;
    top: 50%;
    width: 170rpx;
    height: 2rpx;
    background-color: $text-color-green;
    transform: translateY(-50%);
  }
}
.input {
  display: flex;
  flex-direction: column; // 使每个 input-item 垂直排列
  margin-top: 30rpx;
  .input-item {
    display: flex;
    align-items: center; // 垂直居中对齐
    margin-bottom: 20rpx; // 每个 input 项的间距
    &.description {
      align-items: flex-start;
    }
    .place-box {
      width: 400rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      background-color: #fff; // 设置背景颜色
      border: 1px solid #ccc;
    }

    text {
      width: 230rpx; // 文本宽度
      margin-right: 10rpx; // 文本和 input 之间的间距
      text-align: right; // 右对齐文本
    }

    input {
      padding-left: 10rpx;
      background-color: $bg-color-gray-light;
      border: $text-color-green solid 0.5px;
      width: 400rpx;
      height: 50rpx;
    }

    .uni {
      display: flex;
      justify-content: center;
      align-items: center;
      justify-content: space-between;
      .uni-text {
        width: 400rpx;
        border: 1px solid #ccc;
        padding: 10rpx;
        text-align: center; // 文本居中
        background-color: #fff; // 设置背景颜色
      }
    }
  }
}
.tips {
  margin-top: 60rpx;
  display: flex;
  justify-content: center;
  font-size: xx-small;
  color: #ccc;
}
button {
  margin-top: 20rpx;
  width: 620rpx;
  height: 90rpx;
  border-radius: 5px;
  border: $text-color-green solid 1rpx;
  background-color: $bg-color-green;
}

.logo {
  width: 150rpx;
  height: 150rpx;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

//穿透
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
    height: auto;
    width: 400rpx;
    .u-input {
      height: 50rpx;
      background-color: $bg-color-gray-light;
      border: 1rpx solid $text-color-green !important;
      border-radius: 0 !important;
    }
  }
  .uni-easyinput__content {
    width: 400rpx;
    background-color: $bg-color-gray-light;
  }
}
</style>
