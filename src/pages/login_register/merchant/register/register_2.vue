<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMerchantStore } from '@/stores'
import { GetUniversity, GetRegion } from '@/services/merchant/merchant_api'
import { onLoad } from '@dcloudio/uni-app'
import type { University } from '@/types/merchant_return'
const realName = ref<string>('')
const name = ref<string>('')
const address = ref<string>('')
const detailedAddress = ref<string>('')
const college = ref<string>('')
const merchantStore = useMerchantStore()

const gotoNext = () => {
  merchantStore.realName = realName.value
  merchantStore.name = name.value
  merchantStore.detailedAddress = detailedAddress.value
  uni.navigateTo({
    url: '/pages/login_register/merchant/register/register_3',
  })
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
const flag = ref(null)
// 当选择大学时触发的函数
const onUniversityChange = (e) => {
  const index = e.detail.value
  flag.value = 1
  if (universities.value[index]) {
    const selectedUniversity = universities.value[index]
    // 存储选中的大学 ID 和名称到 Pinia 仓库
    merchantStore.collegeId = selectedUniversity.collegeId
    merchantStore.collegeName = selectedUniversity.collegeName
    college.value = selectedUniversity.collegeName // 更新显示的大学名称
    console.log(merchantStore.collegeId, merchantStore.collegeName)
  }
}
const fetchRegion = async () => {
  console.log('大学信息:', flag)
  if (flag.value != null) {
    const res = await GetRegion(merchantStore.collegeName)
    console.log('1')
    console.log(res.data)
  } else {
    uni.showToast({
      icon: 'none',
      title: '未选择大学！',
    })
    return
  }
}
const resRegion = ref([
  { region: '学子', regionId: 213 },
  { region: '学苑', regionId: 213 },
])

const selectedRegion = ref('')

const onRegionChange = (e) => {
  const index = e.detail.value
  if (resRegion.value[index]) {
    const selected = resRegion.value[index]
    // 更新显示的店铺地址
    selectedRegion.value = selected.region
    merchantStore.address = selectedRegion.value
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
        <input type="text" v-model="realName" />
      </view>
      <view class="input-item">
        <text>店铺名称</text>
        <input type="text" v-model="name" />
      </view>
      <view class="input-item">
        <text>选择大学</text>
        <picker class="uni" mode="selector" :range="universityNames" @change="onUniversityChange"
          ><view class="uni-text">{{ college || '请选择大学' }}</view>
          <!-- 显示选择的大学 --></picker
        >
      </view>
      <view class="input-item">
        <text>选择店铺区域</text>
        <picker
          class="uni"
          mode="selector"
          :range="resRegion.map((item) => item.region)"
          @change="onRegionChange"
          @click="fetchRegion"
        >
          <view class="uni-text">{{ selectedRegion || '请选择店铺区域' }}</view>
          <!-- 显示选择的店铺区域 -->
        </picker>
      </view>

      <view class="input-item">
        <text>店铺详细地址</text>
        <input type="text" v-model="detailedAddress" />
      </view>
    </view>

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
</style>
