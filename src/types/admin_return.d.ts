/**
 * 联络中心模块
 */
// 系统设置
//送餐地址信息
export type AddressItem = {
  addressNumber: string
  id: number
  address: string
  deliveryPrice: number
}

// 管理员同事

// 受邀信息
export type InviteInfo = {
  invitUserName: string
  inviteTime: string
}

// 同事信息
export type ColleagueItem = {
  phoneNumber: string
  realName: string
  avater: string
  invitInfo: InviteInfo | null
}

/**
 * 外卖员管理模块
 */
//外卖员申述
export type FeedBackInfo = {
  id: string
  appealContent: string
  appealImages: Array<string>
  orderNumber: string
  courierId: number
  courierName: string
  courierPhone: string
  merchantId: number
  merchantName: string
  merchantPhone: string
  userId: number
  customer: string
  customerPhone: string
  appealTime: string
}
//外卖员信息
// 定义Info类型，包含nums（数组）、totalOrders（字符串）和totalSalary（字符串）
export type Info = {
  nums: Array<any> // nums数组，可以根据实际需要修改类型
  totalOrders: string // 总订单数，类型为字符串
  totalSalary: string // 总工资，类型为字符串
}

// 定义DataItem类型，包含imageUrl（图片URL）、info（Info类型）、phoneNumber（电话）和realName（真实姓名）
export type DataItem = {
  imageUrl: string // 图片URL，字符串类型
  info: Info // 包含nums, totalOrders, totalSalary的Info对象
  phoneNumber: string // 电话号码，字符串类型
  realName: string // 真实姓名，字符串类型
}
//商户菜单请求信息

export type MerchantRequest = {
  merchantId: number
  addReqCount: number
  updateReqCount: number
  logo: string
  merchantName: string
  phoneNumber: string
}
//商户审核信息
export type MerchantAudit = {
  id: number
  name: string
  address: string
  contactPhone: string
  businessHours: string
  realName: string
  discription: string
  logo: string
}

/**
 * 各端信息反馈
 */
// 反馈信息
export type feedbackType = {
  avater: string
  nikename: string
  content: string
  date: string
  targetGroup: number //反馈人所在群体，0外卖员,1商家,2用户,3全部
  phoneNumber: string
}
