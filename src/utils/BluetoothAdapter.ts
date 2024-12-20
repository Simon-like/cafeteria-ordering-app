/**
 * @description 蓝牙打印相关接口
 * @author 应东林
 * @date 2024-12-19
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-19
 */

type deviceType = {
  deviceId: string
  name: string
  RSSI: number
  localName: string
  advertisServiceUUIDs: string[]
  advertisData: Object
}
type serviceType = {
  uuid: string
  isPrimary: boolean
}

type RWType = {
  deviceId: string ///蓝牙设备的 ID
  serviceId: string //蓝牙服务的 ID
  characteristicId: string //蓝牙特征值的 ID
}

let timer = null //用于保存获取蓝牙设备的定时器
let timer_services = null //用于保存获取蓝牙设备服务的定时器

let deviceInfo: deviceType = {} //设备基础信息
let serviceInfo: serviceType[] = [] //设备服务信息
let RWInfo: RWType = {} //可读写参数信息
/**
 * @初始化并寻找蓝牙设备
 */
function findBluetooth() {
  return new Promise((resolve) => {
    setTimeout(() => {
      /**
       * 初始化蓝牙适配器
       * 开启蓝牙适配器，这是所有蓝牙操作的基础。
       */
      uni.openBluetoothAdapter({
        success(res) {
          console.log('蓝牙适配器打开成功', res)
        },
        fail(err) {
          console.error('蓝牙适配器打开失败', err)
          uni.showToast({
            icon: 'none',
            title: '蓝牙适配器打开失败！',
          })
        },
      })
      /**
       * 开始搜索蓝牙设备
       * 初始化成功后，就可以通过调用 startBluetoothDevicesDiscovery 方法开始搜索附近的蓝牙设备：
       * 注意：此操作比较耗费系统资源，请在搜索并连接到设备后调用
       * uni.stopBluetoothDevicesDiscovery  方法停止搜索。
       */
      uni.startBluetoothDevicesDiscovery({
        success: function (res) {
          console.log('开始搜索蓝牙设备', res)
          /**
           * 监听已发现的蓝牙设备
           * 获取当前已发现的蓝牙设备列表，此方式是回调方法，只要发现了新的蓝牙设备，都会进入该回调：
           */
          uni.onBluetoothDeviceFound(function (devices) {
            console.log('new device list has founded')
            console.dir(devices)
          })

          //轮询获取目前已发现的设备，当找到对应设备应该及时停止
          timer = setInterval(() => {
            uni.getBluetoothDevices({
              success: function (res) {
                console.log('已发现的蓝牙设备', res.devices)
                deviceInfo = res.devices.find((item) => item.deviceId === '86:67:7A:B9:85:81')
                if (!!deviceInfo) {
                  resolve()
                  clearInterval(timer)
                  timer = null
                  //停止
                  uni.stopBluetoothDevicesDiscovery({
                    success: function (res) {
                      console.log('停止搜索蓝牙设备', res)
                    },
                    fail: function (err) {
                      console.error('停止搜索蓝牙设备失败', err)
                    },
                  })
                }
              },
              fail: function (err) {
                console.error('获取已发现的蓝牙设备列表失败', err)
              },
            })
          }, 500)
        },
        fail: function (err) {
          console.error('开始搜索蓝牙设备失败', err)
          uni.showToast({
            icon: 'none',
            title: '开始搜索蓝牙设备失败！',
          })
        },
      })
    }, 0)
  })
}

/**
 * @连接寻找到的蓝牙设备
 */
function connectionBluetooth() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //可以通过设备 ID 调用 createBLEConnection 方法建立与该设备的连接
      uni.createBLEConnection({
        deviceId: deviceInfo.deviceId, //'目标设备ID'
        success: function (res) {
          console.log('连接蓝牙设备成功', res)
          resolve(res)
        },
        fail: function (err) {
          console.error('连接蓝牙设备失败', err)
          reject(err)
        },
      })
    }, 0)
  })
}

/**
 * @获取蓝牙服务和特征值
 * 获取蓝牙服务和特征值这一步尤为重要，
 * 因为后续的打印指令和文本数据都需要通过这些服务和特征值来进行传输。
 * 发送成功的关键也在这一步，是因为这一步我们要成功获取到支持读写的特征值，
 * 才能发送打印指令和文本数据。
 * 一般的，我们根据 deviceId 获取服务，再根据服务 Service 获取特征值 Characteristic，
 * 特征值的 properties 中包含了 read、write、notify、indicate 四个属性，
 * 其中 read 和 write 表示该特征值是否支持读和写操作。
 * {"services":[{"uuid":"00001800-0000-1000-8000-00805F9B34FB","isPrimary":true},
 * {"uuid":"000018F0-0000-1000-8000-00805F9B34FB","isPrimary":true},
 * {"uuid":"0000FEE7-0000-1000-8000-00805F9B34FB","isPrimary":true},{"uuid":"0000FF00-0000-1000-8000-00805F9B34FB","isPrimary":true},
 * {"uuid":"E7810A71-73AE-499D-8C15-FAA9AEF0C3F2","isPrimary":true},
 * {"uuid":"49535343-FE7D-4AE5-8FA9-9FAFD205E455","isPrimary":true}],"errMsg":"getBLEDeviceServices:ok"}
 */

/**
 * @获取蓝牙设备提供的服务
 */
function getBluetoothServices() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //连接成功后，可以通过设备 ID 调用 getBLEDeviceServices 方法获取该设备提供的服务：
      console.log('蓝牙设备', deviceInfo)
      //轮询获取，直到真的获取
      timer_services = setInterval(() => {
        uni.getBLEDeviceServices({
          deviceId: deviceInfo.deviceId, //'目标设备ID'
          success: function (res) {
            serviceInfo = res
            console.log('获取蓝牙设备服务成功', res)
            if (!!serviceInfo) {
              resolve(serviceInfo)
              clearInterval(timer_services)
              timer_services = null
            }
          },
          fail: function (err) {
            console.error('获取蓝牙设备服务失败', err)
            reject(err)
          },
        })
      }, 500)
    }, 0)
  })
}

/**
 * 根据deviceId, serviceId获取某个服务下的所有特征值
 */
function getBLEDeviceCharacteristicsById(deviceId: string, serviceId: string) {
  return new Promise((resolve, reject) => {
    uni.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        resolve(res)
      },
      fail: (e) => {
        reject(e)
      },
    })
  })
}

/**
 * 获取某服务下的支持读写的特征值
 */
const getReadWriteBLEValue = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { deviceId } = deviceInfo
      let res = await getBluetoothServices() // 获取所有服务
      for (const service of res.services) {
        const serviceId = service.uuid
        const characteristicsRes = await getBLEDeviceCharacteristicsById(deviceId, serviceId)
        if (!!characteristicsRes) {
          console.log(serviceId, characteristicsRes)
          // 过滤出可以读写的特征值
          const findList = characteristicsRes?.characteristics.filter(
            (item) =>
              item.properties.read &&
              item.properties.write &&
              item.properties.notify &&
              item.properties.indicate,
          )
          if (findList.length > 0) {
            Object.assign(RWInfo, {
              serviceId,
              characteristicId: findList[0].uuid,
              characteristic: findList[0],
            })
            console.log(`寻找到可以读写的特性`, serviceId, findList[0].uuid)
            return resolve({
              status: 1,
              msg: '成功找到可以读写的特征值',
              data: { serviceId, characteristicId: findList[0].uuid, characteristic: findList[0] },
            })
          }
        }
      }
      return reject('未找到可以读写的特征值')
    } catch (e) {
      reject(e)
    }
  })
}

// 初始化操作
export const initBluetooth = async () => {
  await findBluetooth()
  await connectionBluetooth()
  await getReadWriteBLEValue()
}
// 发送数据
export const writeBLECharacteristicValue = (buffer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 写入蓝牙打印机
      console.log('RWInfo', RWInfo)
      uni.writeBLECharacteristicValue({
        deviceId: deviceInfo.deviceId,
        serviceId: RWInfo.serviceId,
        characteristicId: RWInfo.characteristicId,
        value: buffer,
        success: (res) => {
          console.log('写入成功', JSON.stringify(res))
          resolve(res)
        },
        fail: (e) => {
          console.log('写入失败', JSON.stringify(e))
        },
      })
    }, 0)
  })
}

/**
 * 获取分片数组
 */
function getSliceBufferList(buffer) {
  let pos = 0
  let bytes = buffer.byteLength
  let maxChunk = 20 // 每包控制大小
  let list = []
  while (bytes > 0) {
    let tmpBuffer
    if (bytes > maxChunk) {
      tmpBuffer = buffer.slice(pos, pos + maxChunk)
      pos += maxChunk
      bytes -= maxChunk
    } else {
      tmpBuffer = buffer.slice(pos, pos + bytes)
      pos += bytes
      bytes -= bytes
    }
    list.push(tmpBuffer)
  }
  return list
}

/**
 * 向低功耗蓝牙设备特征值中写入二进制数据
 */
export const writeBLEValueLoop = async (buffer) => {
  return new Promise(async (resolve, reject) => {
    const maxRetries = 3 // 最大重试次数

    let items = getSliceBufferList(buffer)
    for (const item of items) {
      let retries = 0
      while (retries <= maxRetries) {
        try {
          const response = await writeBLECharacteristicValue(item)
          if (response) {
            console.log(`Successfully sent ${item}`)
            break // 请求成功后跳出while循环，进行下一项
          }
        } catch (error) {
          retries++
          console.error(`Failed to send ${item}, retrying... (${retries}/${maxRetries})`)
          if (retries > maxRetries) {
            console.error(`Max retries reached, failed to send ${item}.`)
            break // 达到最大重试次数后停止重试
          }
          // 可以根据需要添加延迟再重试
          await new Promise((resolve) => setTimeout(resolve, 500 * retries)) // 指数退避
        }
      }
    }
    console.log('All items sent successfully.')
    resolve({ status: 1, msg: '发送完成' })
  })
}

// 断开链接并关闭蓝牙

export const closeBluetooth = () => {
  //断开连接
  if (!!deviceInfo.deviceId) {
    uni.closeBLEConnection({
      deviceId: deviceInfo.deviceId,
      success(res) {
        console.log(res)
      },
    })
  }
  /**
   * @关闭蓝牙模块
   * 调用该方法将断开所有已建立的连接并释放系统资源。
   * 一般在使用蓝牙流程完毕后，主动调用该方法，可在页面生命周期中使用。
   * 应与  uni.openBluetoothAdapter 成对调用。
   */
  uni.closeBluetoothAdapter({
    success(res) {
      console.log(res)
    },
  })
}
