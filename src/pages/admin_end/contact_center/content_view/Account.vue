<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useAdminStore } from '@/stores/modules/admin_information'
import { gotoLoginAndRegister } from '@/composables/navigation/navigation'
import { getInviteCode } from '@/services/admin/admin_api'
import { GetUniversity } from '@/services/merchant/merchant_api'
import { upload } from '@/utils/http'

/**
 * @description 管理端联络中心页面账号管理模块
 * @author 应东林 钟礼豪
 * @date 2024-10-12
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime  2024-12-11
 */

const adminStore = useAdminStore()
/**
 * 图片上传功能
 */
const logoPickerPopup = ref()
const fileList1 = ref<Object[]>([])

const openLogoPicker = () => {
  logoPickerPopup.value.open('center')
}

// 新增图片
const afterRead = async (event: Object) => {
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
    const result = await upload('/merchant/uploadMerchantImage', fileList1.value[i].url)
    if (result) {
      adminStore.logo = result.url // 更新logo
      uni.showToast({
        title: `图片修改成功！`,
      })
      logoPickerPopup.value.close()
    }
  }
}

const popup = ref()
const valiForm = ref<UniHelper.FormInstance>(null)
const valiFormData = reactive({
  college: '',
  phoneNumber: '',
})

const onEdit = () => {
  valiFormData.college = adminStore.college
  valiFormData.phoneNumber = adminStore.phoneNumber
  valiFormData.realName = adminStore.realName
  popup.value.open('center')
}

const close = () => {
  popup.value.close()
}

const confirm = () => {
  valiForm.value
    .validate()
    .then((res) => {
      if (res) {
        // 更新管理员信息
        adminStore.updateAdminInfo(valiFormData)
        uni.showToast({
          title: `资料修改成功`,
        })
        popup.value.close()
      }
    })
    .catch((err) => {
      console.log('err', err)
    })
}

const rules = {
  college: [{ required: true, errorMessage: '学校不能为空' }],
  phoneNumber: [{ required: true, errorMessage: '联系电话不能为空' }],
}

// 显示邀请码弹窗
const invitationCodePopup = ref()

// 生成并显示邀请码
const invitationCode = ref('ABC123456') // 这里可以替换为动态生成的邀请邀请码

const openInvitationCodePopup = async () => {
  const res = await getInviteCode('666')
  invitationCode.value = res.data
  invitationCodePopup.value.open('center')
}

const closeInvitationCodePopup = () => {
  invitationCodePopup.value.close()
}
const college = ref(adminStore.college) // 响应式变量，存储选中的大学名称
//数组类型以存储大学列表
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
  const index = e.detail.value
  if (universities.value[index]) {
    const selectedUniversity = universities.value[index]
    // 存储选中的大学 ID 和名称到 Pinia 仓库
    adminStore.collegeId = selectedUniversity.collegeId
    adminStore.collegeName = selectedUniversity.collegeName
    college.value = selectedUniversity.collegeName // 更新显示的大学名称
    console.log(adminStore.collegeId, adminStore.collegeName)
  }
}
</script>

<template>
  <view class="account-mana">
    <view class="platform-logo">
      <image
        :src="adminStore.logo"
        mode="aspectFill"
        class="logo"
        @click="openLogoPicker()"
      ></image>
    </view>
    <view class="content">
      <view class="content-items">学校:{{ adminStore.college }}</view>
      <view class="content-items">联系电话:{{ adminStore.phoneNumber }}</view>
    </view>
    <view class="outlogin" @click="onEdit"><button>修改资料</button></view>
    <view class="outlogin"> <button @click="openInvitationCodePopup">生成个人邀请码</button> </view>
    <view class="outlogin" @click="gotoLoginAndRegister">
      <button>退出登录</button>
    </view>

    <!-- 上传Logo的弹框 -->
    <uni-popup ref="logoPickerPopup" type="bottom" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section
          title="修改平台logo"
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

    <!-- 修改资料弹框 -->
    <uni-popup ref="popup" type="dialog" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section title="修改资料" title-color="rgba(25, 196, 126, 0.7)" title-font-size="40rpx">
          <scroll-view scroll-y="true" class="scroll-Y">
            <view class="form-wrapper">
              <uni-forms
                ref="valiForm"
                :modelValue="valiFormData"
                label-align="right"
                :rules="rules"
              >
                <uni-forms-item required name="college">
                  <template #label
                    ><text>选择大学</text>
                    <picker
                      class="uni"
                      mode="selector"
                      :range="universityNames"
                      @change="onUniversityChange"
                      ><view class="uni-text" style="margin-left: 40rpx">{{
                        college || '请选择大学'
                      }}</view>
                      <!-- 显示选择的大学 --></picker
                    ></template
                  >
                </uni-forms-item>
                <uni-forms-item required name="phoneNumber">
                  <template #label><text style="margin-right: 40rpx">联系电话</text></template>
                  <uni-easyinput v-model="valiFormData.phoneNumber" placeholder="请输入联系电话" />
                </uni-forms-item>
              </uni-forms>
              <view class="submit-button" @click="confirm"><button>确认修改</button></view>
            </view>
          </scroll-view>
        </uni-section>
      </uni-card>
    </uni-popup>
    <!-- 显示邀请码的弹框 -->
    <uni-popup ref="invitationCodePopup" type="dialog" border-radius="10px 10px 0 0">
      <uni-card class="form-card">
        <uni-section title="邀请码" title-color="rgba(25, 196, 126, 0.7)" title-font-size="40rpx">
          <view class="invitation-code-content">
            <text>您的邀请码是：{{ invitationCode }}</text>
          </view>
        </uni-section>
        <view class="action-btns">
          <button @click="closeInvitationCodePopup">关闭</button>
        </view>
      </uni-card>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.account-mana {
  width: 590rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 26rpx;
  gap: 44rpx;

  .platform-logo {
    margin: 20rpx auto;
    .logo {
      width: 200rpx;
      height: 200rpx;
      border: 2px solid rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .content {
    margin-left: 20rpx;
    background-color: $bg-color-light;
    width: 100%;
    padding-left: 20rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    .content-items {
      margin-bottom: 20rpx;
    }
  }
  .outlogin {
    margin: 0 auto;
    button {
      font-size: 28rpx;
      background-color: $bg-color-green;
      color: #000;
      width: 300rpx;
      padding: 5rpx 10rpx;
      border-radius: 40rpx;
      text-align: center;
      &:active {
        opacity: 0.8;
        transform: scale(0.95);
      }
    }
  }
}
</style>
