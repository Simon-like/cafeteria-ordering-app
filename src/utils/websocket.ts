import { useDoubleTokenStore } from '@/stores'
/**
 * @description websocket封装类
 * @author 应东林
 * @date 2024-10-31
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-19
 */

// 心跳间隔、重连websocket间隔，5秒
const interval = 5000
// 重连最大次数
const maxReconnectMaxTime = 5
export default class WS {
  constructor(options) {
    // 状态
    this.status = 'notConnected'
    // 配置
    this.options = options
    // WS实例
    this.socketTask = null
    // 正常关闭
    this.normalCloseFlag = false
    // 重新连接次数
    this.reconnectTime = 1
    // 重新连接Timer
    this.reconnectTimer = null
    // 心跳Timer
    this.heartTimer = null

    // 发起连接
    this.initWS()

    // 关闭WS
    this.close = () => {
      this.status = 'notConnected'
      // 正常关闭状态
      this.normalCloseFlag = true
      // 关闭websocket
      this.socketTask.close()
      // 关闭心跳定时器
      clearInterval(this.heartTimer)
      // 关闭重连定时器
      clearTimeout(this.reconnectTimer)
      console.log('websocket已经断开连接！')
    }
  }

  initWS() {
    const DoubleTokenStore = useDoubleTokenStore()
    const actoken = DoubleTokenStore.accessToken
    // this.options.data 连接websocket所需参数
    const url = `ws://114.55.108.97:8080/ws/${actoken}` + this.options.data.userId
    this.socketTask = uni.connectSocket({
      url,
      header: {
        'content-type': 'application/json',
        token: actoken,
      },
      protocols: ['protocol1'],
      method: 'GET',
      success() {},
    })
    // 监听WS
    this.watchWS()
  }

  watchWS() {
    // 监听 WebSocket 连接打开事件
    this.socketTask.onOpen(() => {
      console.log('websocket连接成功！')
      this.status = 'connected'
      // 连接成功
      this.options.onConnected()
      // 重置连接次数
      this.reconnectTime = 1
      // 发送心跳
      this.onHeartBeat()
      // 监听消息
      this.onMessage()
      // 关闭Toast
      uni.hideLoading()
    })

    // 监听websocket 错误
    this.socketTask.onError((errMsg) => {
      // 关闭并重连
      console.log('这对吗=========')
      this.status = 'notConnected'
      this.normalCloseFlag = false //非正常关闭
      this.socketTask.close()
      // 关闭心跳定时器
      clearInterval(this.heartTimer)
      // 关闭重连定时器
      clearTimeout(this.reconnectTimer)
      console.log('websocket发生错误，正在进行关闭重连，请检查！', errMsg)
      this.onDisconnected(errMsg)
      this.options.onError(errMsg)
    })

    // 监听 WebSocket 连接关闭事件
    this.socketTask.onClose((res) => {
      console.log('发生了关闭', this.normalCloseFlag)
      // 连接错误，发起重连接
      if (!this.normalCloseFlag) {
        this.onDisconnected(res)
      }
    })
  }

  // 监听消息
  onMessage() {
    // 监听websocket 收到消息
    this.socketTask.onMessage((res) => {
      //收到消息
      if (res.data) {
        this.options.onMessage(res.data)
      } else {
        console.log('未监听到消息：原因：', JSON.stringify(res))
        uni.showToast({
          icon: 'none',
          title: '消息接受失败！',
        })
      }
    })
  }

  // 断开连接
  onDisconnected(res) {
    this.status = 'notConnected'
    console.log('websocket断开连接，原因：', JSON.stringify(res))
    // 关闭心跳
    clearInterval(this.heartTimer)
    // 全局Toast提示，防止用户继续发送
    uni.showLoading({ title: '消息收取中…' })
    // 尝试重新连接
    this.onReconnect()
  }

  // 断线重连
  onReconnect() {
    clearTimeout(this.reconnectTimer)
    if (this.reconnectTime < maxReconnectMaxTime) {
      this.reconnectTimer = setTimeout(() => {
        console.log(`第【${this.reconnectTime}】次重新连接中……`)
        this.initWS()
        this.reconnectTime++
      }, interval)
    } else {
      uni.showModal({
        title: '温馨提示',
        content: '服务器开小差啦~请重试',
        showCancel: false,
        confirmText: '我知道了',
        success: () => {
          uni.navigateBack()
        },
      })
      this.options.onError('出错了')
    }
  }

  /** @心跳 **/
  onHeartBeat() {
    this.heartTimer = setInterval(() => {
      this.socketTask.send({
        data: `heart：${this.options.data.userId}`,
        success() {
          console.log('心跳发送成功！')
        },
      })
    }, interval)
  }
}
