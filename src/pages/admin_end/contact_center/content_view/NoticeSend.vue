<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { getNotice, addNotice, deleteNoticeById } from '@/services/admin/admin_api'
import { onLoad } from '@dcloudio/uni-app'
import { debounce, splitContent } from '@/composables/tools'
/**
 * @description 管理端个人中心页面系统公告发布模块
 * @author 应东林
 * @date 2024-10-11
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-13
 */

const scrollTop = ref<number>(0)

const goTop = (e: any) => {
  scrollTop.value = 1
  // 解决view层不同步的问题
  nextTick(function () {
    scrollTop.value = 0
    uni.showToast({
      icon: 'none',
      title: '已返回顶部',
    })
  })
}

// 公告列表
const notice_list = ref<
  {
    id: number
    targetGroup: number
    noticeContent: string
    releaseTime: string
    is_show: boolean
    index: number
  }[]
>([])

// 展开/关闭一个公告
const onDescShow = (index: number) => {
  notice_list.value.forEach((item) => {
    if (item.index === index) item.is_show = !item.is_show
    else item.is_show = false
  })
}

// 编辑公告

const popup = ref()
const valiForm = ref<UniHelper.FormInstance>()
const onEdit = () => {
  popup.value.open('center')
}

// 校验表单数据
const valiFormData = reactive({
  targetGroup: 0,
  noticeContent: '',
})
const rules = {
  targetGroup: {
    rules: [
      {
        required: true,
        errorMessage: '必须选择面向群体',
      },
    ],
  },
  noticeContent: {
    rules: [
      {
        required: true,
        errorMessage: '公告内容不能为空',
      },
    ],
  },
}

const submit = () => {
  valiForm.value
    ?.validate()
    .then(async (response: string) => {
      const res = await addNotice(valiFormData.noticeContent, valiFormData.targetGroup)
      if (res.code === 1) {
        await getAllNotice()
        popup.value.close()
        uni.showToast({
          icon: 'none',
          title: '发布成功！',
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: '发布失败！',
        })
      }
    })
    .catch((err: string) => {
      console.log('err', err)
    })
}

// 防抖处理
const debounceSubmit = debounce(submit, 500, true)

// 获取所有公告

const getAllNotice = async () => {
  const res = await getNotice()
  if (res.code === 1) {
    let flag = 0
    notice_list.value = []
    res.data.reverse() //数组倒序，从前往后排序
    res.data.forEach((item) => {
      notice_list.value.push({
        id: item.id,
        targetGroup: item.targetGroup,
        noticeContent: item.content,
        releaseTime: item.releaseTime.split('T')[0],
        is_show: false,
        index: flag++,
      })
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '公告获取失败！',
    })
  }
}

const DELETEPopup = ref()
const noticeId = ref<number>(-1)
// 删除公告
const onDELETE = (id: number) => {
  noticeId.value = id
  DELETEPopup.value.open('center')
}

const onDELETE_confirm = async () => {
  const res = await deleteNoticeById(noticeId.value)
  if (res.code === 1) {
    await getAllNotice()
    DELETEPopup.value.close()
    uni.showToast({
      icon: 'none',
      title: '公告删除成功！',
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '公告删除失败！',
    })
  }
}

const onDELETE_close = () => {
  noticeId.value = -1
  DELETEPopup.value.close()
}

onLoad(async () => {
  await getAllNotice()
})
</script>

<template>
  <view class="notice-send">
    <view class="box">
      <view class="button-box">
        <view class="add-notice-btn btn" @click="onEdit"
          ><i class="iconfont icon-jia"></i> 新增公告</view
        >
        <view class="toTop btn" @click="goTop"><i class="iconfont icon-jiantou-copy"></i></view>
      </view>
      <view class="wrapper">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-wrapper">
          <view class="notice-box" v-for="item in notice_list" :key="item.index">
            <view class="notice-line">
              <view class="title">发布时间：</view>
              <view class="value">{{ item.releaseTime }}</view>
            </view>
            <view class="notice-line">
              <view class="title">面向对象：</view>
              <view class="value">{{ item.targetGroup === 1 ? '商家' : '外卖员' }}</view>
            </view>
            <view class="notice-line">
              <view class="title">公告内容：</view>
            </view>
            <view class="notice-content-wrapper" :class="{ show: item.is_show }">
              <view class="content">
                <view class="inner">
                  <p v-for="line in splitContent(item.noticeContent)" :key="line">{{ line }}</p>
                </view>
              </view>
            </view>
            <view class="delete btn" @click="onDELETE(item.id)">删除</view>
            <view @click="onDescShow(item.index)" class="icon" :class="{ show: item.is_show }">
              <i class="iconfont icon-jiantou_xia"></i>
            </view>
          </view>
        </scroll-view>

        <uni-popup ref="popup" type="dialog" border-radius="10px 10px 0 0">
          <uni-card class="form-card">
            <section>
              <h3>编辑公告</h3>
              <scroll-view scroll-y="true" class="scroll-Y">
                <view class="form-wrapper">
                  <!-- 基础表单 -->
                  <uni-forms
                    ref="valiForm"
                    :modelValue="valiFormData"
                    label-position="top"
                    :rules="rules"
                  >
                    <uni-forms-item required name="targetGroup">
                      <template #label><text class="label">面向群体：</text></template>
                      <uni-data-select
                        v-model="valiFormData.targetGroup"
                        :localdata="[
                          { value: 0, text: '外卖员' },
                          { value: 1, text: '商家' },
                        ]"
                        placeholder="请选择发布群体"
                      ></uni-data-select>
                    </uni-forms-item>
                    <uni-forms-item name="noticeContent" required>
                      <template #label><text class="label">公告内容：</text></template>
                      <uni-easyinput
                        type="textarea"
                        v-model="valiFormData.noticeContent"
                        placeholder="请输入公告内容"
                      />
                    </uni-forms-item>
                  </uni-forms>
                  <view class="submit-button btn" @click="debounceSubmit"> 提交 </view>
                </view>
              </scroll-view>
            </section>
          </uni-card>
        </uni-popup>

        <uni-popup ref="DELETEPopup" type="bottom" border-radius="10px 10px 0 0">
          <uni-card class="form-card delete-card">
            <section>
              <h3>删除提示框</h3>
              <view class="wrapper">
                <view class="content">您确认要删除该公告吗？</view>
                <view class="button-box">
                  <view class="close btn" @click="onDELETE_close">误触</view>
                  <view class="confirm btn" @click="onDELETE_confirm">确认删除</view>
                </view>
              </view>
            </section>
          </uni-card>
        </uni-popup>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.notice-send {
  width: 590rpx;
  height: 80vh;
  font-size: 30rpx;
  padding: 30rpx 18rpx;
  .btn {
    background: $bg-color-green;
    border-radius: 40rpx;
    text-align: center;
    transition: 0.2s ease;
    font-weight: 550;
    &:active {
      scale: 0.95;
    }
  }

  .button-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40rpx;
    .add-notice-btn {
      padding: 0 10rpx;
      width: 280rpx;
      height: 60rpx;
      line-height: 60rpx;
      i {
        color: #fff;
        margin-right: 20rpx;
      }
    }
    .toTop {
      background: $bg-color-green;
      padding: 10rpx;
      border-radius: 16rpx;
    }
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30rpx;
    height: 90%;
    .wrapper {
      width: 100%;
      height: 100%;
    }
  }

  .notice-box {
    width: 100%;
    background: $bg-color-gray-light;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    margin-bottom: 20rpx;
    .notice-line {
      display: flex;
      gap: 10rpx;
    }
    .notice-content-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20rpx;

      .content {
        display: grid;
        grid-template-rows: 0fr;
        transition: all 0.3s ease-out;
        border-top: 1px solid transparent;
        .inner {
          overflow: hidden;
        }
      }

      &.show .content {
        border-top: 1px solid #000;
        grid-template-rows: 1fr;
      }
    }

    .icon {
      width: 100%;
      text-align: center;
      transition: 0.3s ease-out;
      color: #b1caae;
      &.show {
        transform: rotate(180deg);
      }
    }

    .delete {
      align-self: flex-end;
      margin-right: 20rpx;
      font-size: 28rpx;
      padding: 10rpx 20rpx;
      color: #b1caae;
      border: 1px solid #b1caae;
      background: #fff;
      border-radius: 40rpx;
    }
  }

  .form-card {
    width: 600rpx;
    height: 670rpx;
    &.delete-card {
      height: auto;
    }

    h3 {
      font-size: 40rpx;
      margin-bottom: 30rpx;
      color: $text-color-active;
    }

    .label {
      font-size: 32rpx;
      color: #000;
      margin-bottom: 16rpx;
    }

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
    }
    :deep(.uni-easyinput__placeholder-class) {
      color: $text-color-green;
    }

    .wrapper {
      padding: 20rpx;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 20rpx;
      .button-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .confirm,
        .close {
          color: #000;
          width: 200rpx;
          padding: 10rpx 0rpx;
        }
      }
    }

    .scroll-Y {
      height: 550rpx;
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
</style>
