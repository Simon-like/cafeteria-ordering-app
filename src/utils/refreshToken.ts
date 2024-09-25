import { useDoubleTokenStore } from '@/stores'

/**
 * @description 刷新accessToken请求函数
 * @author 应东林
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-19
 */

interface Data {
  code: string
  msg: string
  data: { accessToken: string; refreshToken: string }
}

export const refreshToken = () => {
  //发起刷新token请求
  const DoubleTokenStore = useDoubleTokenStore()

  return new Promise<Data>((resolve, reject) => {
    uni.request({
      method: 'GET',
      url: '/common/newToken/login',
      success(res) {
        console.log('刷新token的第一层响应信息：', res)
        //成功获取新的token
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const tokenData = res.data as Data
          //更新token
          DoubleTokenStore.addToken(tokenData.data.accessToken, tokenData.data.refreshToken)
          resolve(tokenData)
        } else if (res.statusCode === 409) {
          uni.showToast({
            icon: 'none',
            title: 'refreshToken过期，请重新登录',
          })
          uni.navigateTo({
            url: '/pages/login_register/login_register',
          })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data).msg || '请求错误哦~',
          })
          reject(res)
        }
      },
      // 响应失败（比如网络没了）
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
