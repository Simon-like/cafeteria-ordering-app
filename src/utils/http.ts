import { useDoubleTokenStore } from '@/stores'
import { refreshToken } from '@/utils/refreshToken'

/**
 * @description 网络请求拦截器，已初步完成双token设置
 * @author 应东林
 * @date 2024-09-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-19
 */

const baseURL = 'http://114.55.108.97:8080'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需要拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时
    options.timeout = 10000
    // 3. 添加请求头标识
    options.header = {
      ...options.header,
      // 'source-client': 'miniapp',
    }
    // 4. 添加 token 请求标识
    const DoubleTokenStore = useDoubleTokenStore()
    const actoken = DoubleTokenStore.accessToken
    const retoken = DoubleTokenStore.refreshToken
    options.header.token = actoken
    options.header.refreshToken = retoken

    console.log('请求信息：', options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFlie', httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 * 1. 返回 Promise 对象
 * 2. 请求成功
 * 		2.1 提取核心数据 res.data
 * 		2.2 添加类型，支持泛型
 * 3. 请求失败
 * 		3.1 网络错误 -> 提示用户换网络
 * 		3.2 401错误 -> 清理用户信息，跳转到登录页
 * 		3.3 其他错误 -> 根据后端错误信息轻提示
 */

interface Data<T> {
  code: string
  msg: string
  data: T
}

// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        console.log('第一层响应信息：', res)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 获取数据成功，调用resolve
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误(actoken过期)
          //发起刷新token请求
          refreshToken().then((res) => {
            console.log('刷新的token：', res)
            //重新上一次的请求
            uni.request({
              ...options,
            })
          })
        } else {
          // 通用错误，调用reject
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误哦~',
          })
          reject(res)
        }
      },
      // 响应失败（比如网络没了）
      fail(err) {
        console.log('响应失败了，第一层响应信息：', err)
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
