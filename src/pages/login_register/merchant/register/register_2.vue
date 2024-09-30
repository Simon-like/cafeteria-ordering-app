<script lang="ts" setup>
import { ref } from 'vue'
import { useMerchantStore } from '@/stores'
import { GetUniversity } from '@/services/merchant/merchant_api'
import { onLoad } from '@dcloudio/uni-app'

const realName = ref<string>('')
const name = ref<string>('')
const address = ref<string>('')
const college = ref<string>('')
const merchantStore = useMerchantStore()

const gotoNext = () => {
  merchantStore.realName = realName.value
  merchantStore.name = name.value
  merchantStore.address = address.value
  uni.navigateTo({
    url: '/pages/login_register/merchant/register/register_3',
  })
}

// 改为数组类型以存储大学列表
const universities = ref<Array<{ collegeId: string; collegeName: string }>>([])

// 获取大学列表的函数
const fetchUniversities = async () => {
  const res = await GetUniversity()
  universities.value = res.data.UniversityList.map((university) => university.collegeName)
}

// 在页面加载时调用获取大学列表的函数
onLoad(() => fetchUniversities())

// 当选择大学时触发的函数
const onUniversityChange = (e) => {
  const index = e.detail.value
  if (universities.value[index]) {
    college.value = universities.value[index].collegeName // 获取大学的名称
  }
}
</script>

<template>
  <view class="body">
    <view class="title"> 注册 </view>
    <view class="nav">
      <view class="nav-item">
        <view class="circle" id="line"> 1 </view>
        <text>注册账户</text>
      </view>
      <view class="nav-item">
        <view class="circle" id="line"> 2 </view>
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
        <text>店铺地址</text>
        <input type="text" v-model="address" />
      </view>
      <view class="input-item">
        <text>选择大学</text>
        <picker class="uni" mode="selector" :range="universities" @change="onUniversityChange"
          ><view class="uni-text">{{ college || '请选择大学' }}</view>
          <!-- 显示选择的大学 --></picker
        >
      </view>
    </view>

    <text class="tips">--店铺详细信息注册完成后可在门店管理页面中更改--</text>
    <view class="checkbox__container">
      <label> <checkbox /><text>我已阅读并同意xxxxxx</text> </label>
    </view>
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
      background-color: #ccc;
      margin-left: 42rpx;
      margin-bottom: 20rpx;
    }
  }
}
#line {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: -70px;
    top: 50%;
    width: 140rpx;
    height: 10rpx;
    background-color: #ccc;
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
      background-color: #ccc;
      border: #000 solid 1rpx;
      width: 400rpx;
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
  display: flex;
  justify-content: center;
  font-size: xx-small;
  color: #ccc;
}
.checkbox__container {
  margin: 20rpx 0;
  display: flex;
  justify-content: center;
}
button {
  width: 45%;
  border: #000 solid 1rpx;
}
</style>
