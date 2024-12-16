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
