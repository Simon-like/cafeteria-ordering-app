/**
 * 联络中心模块
 */
// 系统设置
//送餐地址信息
export type AdressItem = {
  adressNumber: string
  adressId: number
  adress: string
  DeliveryPrice: number
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
