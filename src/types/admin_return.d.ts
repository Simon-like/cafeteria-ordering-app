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
export type CourierFeedback = {
  time: string
  type: string
  content: string
  imgs: string
  orderNumber: string
  diliver: string
  diliver_phone: string
  name: string
  contactPhone: string
  customer: string
  customer_phone: string
}
//外卖员信息
export type CourierInfo = {
  imageUrl: string
  info: {
    nums: [{}]
    totalOrders: string
    totalSalary: string
  }
  phoneNumber: string
  realName: string
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
